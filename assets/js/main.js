(() => {
  "use strict";

  // 1) Auto year in footer (id="year")
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Copy email button (data-copy-email="...")
  const copyBtn = document.querySelector("[data-copy-email]");
  if (!copyBtn) return;

  const originalText = copyBtn.textContent;
  const email = copyBtn.getAttribute("data-copy-email") || "";

  // Small helper for UI feedback
  const flash = (text, ms = 1200) => {
    copyBtn.textContent = text;
    copyBtn.disabled = true;
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.disabled = false;
    }, ms);
  };

  copyBtn.addEventListener("click", async () => {
    if (!email) {
      flash("No email set");
      return;
    }

    // Preferred: Clipboard API (secure context: https)
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        flash("Email copied");
        return;
      }
    } catch (_) {
      // Continue to fallback
    }

    // Fallback: create temporary input for copy
    try {
      const temp = document.createElement("input");
      temp.value = email;
      temp.setAttribute("readonly", "true");
      temp.style.position = "absolute";
      temp.style.left = "-9999px";
      temp.style.top = "0";
      document.body.appendChild(temp);
      temp.select();
      temp.setSelectionRange(0, temp.value.length);

      const ok = document.execCommand("copy");
      document.body.removeChild(temp);

      if (ok) {
        flash("Email copied");
        return;
      }
    } catch (_) {
      // Continue to final fallback
    }

    // Final fallback: prompt user to copy manually
    window.prompt("Copy email:", email);
  });
})();
