const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const rangeInput = document.getElementById("rangeInput");
const charLen = document.getElementById("characterLength");
const passEl = document.getElementById("passwordContent");
const copyBtn = document.getElementById("copyButton");
const genBtn = document.getElementById("generateButton");
const toast = document.getElementById("copiedToast");
const strText = document.getElementById("strengthText");
const bars = document.getElementById("strengthBars").children;

function updateSlider() {
  const min = +rangeInput.min,
    max = +rangeInput.max,
    val = +rangeInput.value;
  const pct = Math.round(((val - min) / (max - min)) * 100);
  rangeInput.style.setProperty("--pct", pct + "%");
  charLen.textContent = val;
}

function generate() {
  const useUpper = document.getElementById("upperInput").checked;
  const useLower = document.getElementById("lowerInput").checked;
  const useNumber = document.getElementById("numberInput").checked;
  const useSymbol = document.getElementById("symbolInput").checked;

  let pool = "";
  let required = [];
  if (useUpper) {
    pool += upper;
    required.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  if (useLower) {
    pool += lower;
    required.push(lower[Math.floor(Math.random() * lower.length)]);
  }
  if (useNumber) {
    pool += nums;
    required.push(nums[Math.floor(Math.random() * nums.length)]);
  }
  if (useSymbol) {
    pool += syms;
    required.push(syms[Math.floor(Math.random() * syms.length)]);
  }

  if (!pool) {
    passEl.textContent = "—";
    updateStrength(0, 0);
    return;
  }

  const len = +rangeInput.value;
  let pw = [...required];
  for (let i = pw.length; i < len; i++) {
    pw.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  pw = pw.sort(() => Math.random() - 0.5);
  passEl.textContent = pw.join("");

  const types = [useUpper, useLower, useNumber, useSymbol].filter(
    Boolean,
  ).length;
  updateStrength(len, types);
}

function updateStrength(len, types) {
  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (types >= 2) score++;
  if (types >= 3) score = Math.max(score, 2);
  if (types >= 4) score = Math.max(score, 3);
  score = Math.min(score, 4);

  const labels = ["", "WEAK", "MEDIUM", "STRONG", "VERY STRONG"];
  const cls = score <= 1 ? "danger" : score === 2 ? "warn" : "";
  strText.textContent = labels[score] || "—";

  for (let i = 0; i < bars.length; i++) {
    bars[i].className = "pg-bar";
    if (i < score) {
      bars[i].classList.add("active");
      if (cls) bars[i].classList.add(cls);
    }
  }
}

rangeInput.addEventListener("input", () => {
  updateSlider();
  generate();
});
genBtn.addEventListener("click", generate);

copyBtn.addEventListener("click", () => {
  const pw = passEl.textContent;
  if (!pw || pw === "—") return;
  navigator.clipboard.writeText(pw).then(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1500);
  });
});

updateSlider();
generate();
