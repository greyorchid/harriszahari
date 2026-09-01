(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const rubric = window.ITDM_RUBRIC || [];
  const titles = Object.fromEntries(rubric.map((item) => [item.id, item.title]));
  let currentRun = null;
  let progressTimer;

  async function health() {
    try {
      const data = await fetch("/api/health").then((response) => response.json());
      $("apiStatus").textContent = data.liveEnabled ? `Live engine ready, ${data.model}` : "Demo ready, live AI disabled";
      $("mode").querySelector('option[value="live"]').disabled = !data.liveEnabled;
    } catch (_) { $("apiStatus").textContent = "Engine unavailable"; $("run").disabled = true; }
  }
  function metric(label, value, detail) { return `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${detail}</small></div>`; }
  function assessorHtml(result, eci) {
    return `<div class="assessment-summary"><span>Prediction</span><strong>${escapeHtml(result.prediction.outcome)}</strong><span>Confidence ${result.prediction.confidence}%</span><span>Drivers: ${result.prediction.drivers.join(", ")}</span><span>ECI: ${eci.round1.effective}% to ${eci.final.effective}%</span><span>Final base ${eci.final.base}%, cap ${eci.final.cap}%</span></div>`;
  }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]); }
  function render(run) {
    currentRun = run; const c = run.comparison;
    $("metrics").innerHTML = [metric("Exact agreement", `${c.exact.percent}%`, `${c.exact.count} of 16`),metric("Within one point", `${c.withinOne.percent}%`, `${c.withinOne.count} of 16`),metric("Weighted kappa", c.quadraticWeightedKappa.toFixed(2), "Quadratic weights"),metric("Review status", c.requiresHumanReview ? "Required" : "Required", "Human approval gate")].join("");
    $("assessorA").innerHTML = assessorHtml(run.assessorA, c.eci.assessorA); $("assessorB").innerHTML = assessorHtml(run.assessorB, c.eci.assessorB);
    $("differences").innerHTML = rubric.map((item) => { const a=run.assessorA.scores[item.id].score,b=run.assessorB.scores[item.id].score; return `<tr><td><strong>${item.id}</strong> ${escapeHtml(titles[item.id])}</td><td>${a}</td><td>${b}</td><td>${Math.abs(a-b)}</td></tr>`; }).join("");
    $("reviewText").textContent = c.requiresHumanReview ? "The assessors crossed an automatic review threshold. Inspect disagreements and evidence before use." : "Agreement thresholds passed. Human review remains mandatory because agreement does not prove correctness.";
    $("results").classList.remove("hidden"); $("feedback").classList.remove("hidden");
  }
  async function run() {
    $("run").disabled = true; $("error").classList.add("hidden"); $("results").classList.add("hidden"); $("progress").classList.remove("hidden");
    const steps=["Preparing blinded evidence package.","Running Assessor A and Assessor B independently.","Locking Round 1 before contradiction release.","Validating evidence IDs and score changes.","Calculating agreement and ECI sensitivity."]; let i=0;
    $("progressText").textContent=steps[0]; $("progressBar").style.width="15%";
    progressTimer=setInterval(()=>{i=Math.min(i+1,steps.length-1);$("progressText").textContent=steps[i];$("progressBar").style.width=`${15+i*18}%`;},900);
    try { const response=await fetch("/api/diagnose",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({mode:$("mode").value})}); const data=await response.json(); if(!response.ok) throw new Error(data.error||"Diagnostic failed."); render(data); }
    catch(error){$("error").textContent=error.message;$("error").classList.remove("hidden");}
    finally{clearInterval(progressTimer);$("progress").classList.add("hidden");$("run").disabled=false;}
  }
  function download(name,data){const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);}
  function feedbackData(){return {runId:currentRun?.runId||"",role:$("feedbackRole").value,ratings:{clarity:Number($("clarity").value),traceability:Number($("traceability").value),usefulness:Number($("usefulness").value)},comments:$("comments").value,consent:$("consent").checked};}
  $("run").addEventListener("click",run); $("mode").addEventListener("change",()=>{$("modeHelp").textContent=$("mode").value==="live"?"Live mode makes four model calls: two assessors across two locked rounds.":"Demo mode uses locked regression fixtures.";});
  for(const id of ["clarity","traceability","usefulness"]) $(id).addEventListener("input",()=>$(id+"Out").textContent=$(id).value);
  $("exportRun").addEventListener("click",()=>currentRun&&download(`itdm-run-${currentRun.runId}.json`,currentRun));
  $("exportFeedback").addEventListener("click",()=>download(`itdm-feedback-${currentRun?.runId||"draft"}.json`,feedbackData()));
  $("saveFeedback").addEventListener("click",async()=>{try{const response=await fetch("/api/feedback",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(feedbackData())});const data=await response.json();if(!response.ok)throw new Error(data.error);$("feedbackStatus").textContent=`Feedback saved: ${data.feedbackId}`;}catch(error){$("feedbackStatus").textContent=error.message;}});
  health();
})();
