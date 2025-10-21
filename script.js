gsap.to(".circles", {
  rotate: 360,
  duration: 2,
  ease: "linear",
  repeat: -1,
});
gsap.from(".welcome-text p", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power2.out",
});

setTimeout(() => {
  gsap.to("#preloader", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      const main = document.getElementById("main-content");
      main.style.display = "block";
      gsap.from(main, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      initializeApp();
    },
  });
}, 5000);

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const notification = document.createElement("div");
      notification.className = "copy-notification";
      notification.textContent = "Copied to clipboard!";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2300);
    })
    .catch(() => {
      const notification = document.createElement("div");
      notification.className = "copy-notification";
      notification.style.backgroundColor = "#d32f2f";
      notification.innerHTML = "✗ Failed to copy!";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2300);
    });
}
function initializeApp() {
  const style = document.createElement("style");
  style.textContent = `
    .confirm-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(2px);
    }
    .confirm-content {
      background-color: #333;
      padding: 25px;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 1px solid #5f249f;
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .confirm-message {
      color: #fff;
      margin-bottom: 20px;
      font-size: 1.1rem;
      line-height: 1.5;
    }
    .confirm-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .confirm-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      min-width: 80px;
    }
    .confirm-btn-yes {
      background-color: #5f249f;
      color: white;
    }
    .confirm-btn-no {
      background-color: #444;
      color: white;
    }
    .confirm-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .confirm-btn:active {
      transform: translateY(1px);
    }
    .confirm-gif-container {
      text-align: center;
      margin-top: 10px;
    }
    .confirm-gif-container img {
      max-width: 300px;
      border-radius: 6px;
    }
    .copy-notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #5f249f;
      color: #f6f6f6;
      padding: 12px 24px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1001;
      animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2s forwards;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .copy-notification::before {
      content: "✓";
      font-weight: bold;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    .rma-section {
      display: none;
      padding: 20px 42px;
      background-color: #000;
      margin: 20px 42px;
      border-bottom: 1px solid #222;
      color: #fff;
    }
    .rma-container {
      display: flex;
      gap: 42px;
    }
    .rma-form {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .rma-form-row {
      display: flex;
      flex-direction: column;
    }
    .rma-form-row label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #e0e0e0;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: color 0.3s ease;
      font-family: "Jost", sans-serif;
    }
    .rma-form-row input,
    .rma-form-row select {
      width: 100%;
      background-color: #222;
      padding: 6px 8px;
      border: 1px solid #9968ff;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
      color: #fff;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .rma-form-row input:focus,
    .rma-form-row select:focus {
      border-color: #5f249f;
      outline: none;
      box-shadow: 0 0 0 2px rgba(95, 36, 159, 0.3);
    }
    .rma-form-row:has(input:focus) label,
    .rma-form-row:has(select:focus) label {
      color: #5f249f;
    }
    .rma-gif-section {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .rma-gif-container {
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #222;
    }
    .rma-gif-container img {
      width: 100%;
      display: block;
    }
    .tracking-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 5px 10px;
      background-color: #5f249f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-family: "Jost", sans-serif;
      transition: background-color 0.3s ease;
    }
    .tracking-btn:hover {
      background-color: #4a1d7f;
    }
    .rma-buttons {
      margin-bottom: 12px;
      display: flex;
      gap: 10px;
      grid-column: 1 / -1;
    }
    .rma-buttons button {
      padding: 10px 18px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid #222;
      background-color: #000;
      color: #ccc;
      font-family: "Jost", sans-serif;
      transition: background-color 0.3s, color 0.3s;
    }
    .rma-buttons button:hover {
      color: #9968ff;
      background-color: #111;
      border-color: #333;
    }
    .rma-buttons .rma-clear {
      background-color: transparent;
      color: #f44336;
      border: 1px solid #f44336;
      transition: background-color 0.3s, color 0.3s;
    }
    .rma-buttons .rma-clear:hover {
      background-color: #f44336;
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  const tabsContainer = document.createElement("div");
  tabsContainer.id = "tabs";
  const tabContents = document.createElement("div");
  tabContents.id = "tab-contents";
  const banner = document.querySelector(".scroll-banner");
  banner.insertAdjacentElement("afterend", tabsContainer);
  tabsContainer.insertAdjacentElement("afterend", tabContents);

  const rmaSection = document.createElement("div");
  rmaSection.className = "rma-section";
  rmaSection.id = "rma-section";
  rmaSection.innerHTML = `
    <div class="rma-buttons">
      <button type="button" class="rma-copy-summary">Copy Summary</button>
      <button type="button" class="rma-copy-ticket">Copy For Ticket</button>
      <button type="button" class="rma-copy-teams">Copy For Teams</button>
      <button type="button" class="rma-clear">Clear</button>
    </div>
    <div class="rma-container">
      <form class="rma-form">
        <div class="rma-form-row">
          <label for="rma-caller-name">Callers First and Last Name:</label>
          <input type="text" id="rma-caller-name" name="callerName" />
        </div>
        <div class="rma-form-row">
          <label for="rma-caller-phone">Callers Phone Number:</label>
          <input type="text" id="rma-caller-phone" name="callerPhone" />
        </div>
        <div class="rma-form-row">
          <label for="rma-caller-email">Callers Email Address:</label>
          <input type="email" id="rma-caller-email" name="callerEmail" />
        </div>
        <div class="rma-form-row">
          <label for="rma-company-number">Company Number:</label>
          <input type="text" id="rma-company-number" name="companyNumber" />
        </div>
        <div class="rma-form-row">
          <label for="rma-store-number">Store Number:</label>
          <input type="text" id="rma-store-number" name="storeNumber" />
        </div>
        <div class="rma-form-row">
          <label for="rma-aloha-key">Aloha Key:</label>
          <input type="text" id="rma-aloha-key" name="alohaKey" />
        </div>
        <div class="rma-form-row">
          <label for="rma-ticket-number">Ticket Number:</label>
          <input type="text" id="rma-ticket-number" name="ticketNumber" />
        </div>
        <div class="rma-form-row">
          <label for="rma-issue-summary">Issue Summary:</label>
          <input type="text" id="rma-issue-summary" name="issueSummary" />
        </div>
        <div class="rma-form-row">
          <label for="rma-pinpad-model">PIN Pad Model:</label>
          <input type="text" id="rma-pinpad-model" name="pinpadModel" />
        </div>
        <div class="rma-form-row">
          <label for="rma-firmware-version">Firmware version:</label>
          <input type="text" id="rma-firmware-version" name="firmwareVersion" />
        </div>
        <div class="rma-form-row">
          <label for="rma-cable-type">Cable Type:</label>
          <input type="text" id="rma-cable-type" name="cableType" />
        </div>
        <div class="rma-form-row">
          <label for="rma-error-message">Error message on the PIN Pad:</label>
          <input type="text" id="rma-error-message" name="errorMessage" />
        </div>
        <div class="rma-form-row">
          <label for="rma-sla">Contractual SLA:</label>
          <input type="text" id="rma-sla" name="sla" />
        </div>
        <div class="rma-form-row">
          <label for="rma-com-port">Is the PIN Pad visible under COM port?:</label>
          <select id="rma-com-port" name="comPort">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="rma-form-row">
          <label for="rma-usb-drivers">USB Drivers up-to-date?:</label>
          <select id="rma-usb-drivers" name="usbDrivers">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="rma-form-row">
          <label for="rma-power-drained">PIN Pad Power Drained?:</label>
          <select id="rma-power-drained" name="powerDrained">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="rma-form-row">
          <label for="rma-swapped">PIN Pad Swapped to a different terminal?:</label>
          <select id="rma-swapped" name="swapped">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="rma-form-row">
          <label for="rma-working-another">PIN Pad working on another Terminal?</label>
          <select id="rma-working-another" name="workingAnother">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </form>
      
      <div class="rma-gif-section">
        <div class="rma-gif-container">
          <img src="Images/DHL-gif.gif" alt="DHL Tracking" />
          <button class="tracking-btn">Check Tracking of Package</button>
        </div>
        <div class="rma-gif-container">
          <img src="Images/fedex-gif.gif" alt="FedEx Tracking" />
          <button class="tracking-btn">Check Tracking of Package</button>
        </div>
        <div class="rma-gif-container">
          <img src="Images/UPS-gif.gif" alt="UPS Tracking" />
          <button class="tracking-btn">Check Tracking of Package</button>
        </div>
      </div>
    </div>
  `;
  tabContents.insertAdjacentElement("afterend", rmaSection);

  let tabCount = 0;
  const tabs = [];
  let isInTicketSection = false;
  let previousSection = "";

  const ticketBtn = document.getElementById("btn-ticket-template");
  const rmaBtn = document.getElementById("btn-rma");
  const sorrBtn = document.getElementById("btn-sorr");
  const timezoneBtn = document.getElementById("btn-timezone");
  const hardwareBtn = document.getElementById("btn-hardware-helper");
  const commandBtn = document.getElementById("btn-command-list");
  const saveDataBtn = document.getElementById("btn-save-data");

  ticketBtn.addEventListener("click", handleTicketButtonClick);
  rmaBtn.addEventListener("click", handleRmaButtonClick);
  sorrBtn.addEventListener("click", handleSorrButtonClick);
  timezoneBtn.addEventListener("click", handleTimezoneButtonClick);
  hardwareBtn.addEventListener("click", handleHardwareButtonClick);
  commandBtn.addEventListener("click", handleCommandButtonClick);
  saveDataBtn.addEventListener("click", handleSaveDataButtonClick);

  createNewTab();
  isInTicketSection = true;
  previousSection = "ticket";
  tabsContainer.style.display = "flex";
  tabContents.style.display = "block";
  rmaSection.style.display = "none";
  document.getElementById("sorr-section").style.display = "none";
  document.getElementById("timezone-section").style.display = "none";
  document.getElementById("hardware-section").style.display = "none";
  document.getElementById("command-list-section").style.display = "none";

  function hideAllSections() {
    document.querySelectorAll("section.command-section").forEach((sec) => {
      sec.style.display = "none";
    });

    document.getElementById("rma-section").style.display = "none";
    document.getElementById("sorr-section").style.display = "none";
    document.getElementById("timezone-section").style.display = "none";
    document.getElementById("hardware-section").style.display = "none";
    document.getElementById("command-list-section").style.display = "none";
    document.getElementById("save-data-section").style.display = "none";

    tabsContainer.style.display = "none";
    tabContents.style.display = "none";
  }

  function handleTicketButtonClick() {
    hideAllSections();
    tabsContainer.style.display = "flex";
    tabContents.style.display = "block";

    if (previousSection === "ticket") {
      createNewTab();
    } else {
      if (tabs.length === 0) {
        createNewTab();
      } else {
        setActiveTab(tabs[0]);
      }
    }

    isInTicketSection = true;
    previousSection = "ticket";
  }

  function handleRmaButtonClick() {
    hideAllSections();
    isInTicketSection = false;
    previousSection = "rma";
    rmaSection.style.display = "block";
  }

  function handleSorrButtonClick() {
    hideAllSections();
    previousSection = "sorr";
    document.getElementById("sorr-section").style.display = "block";
  }

  function handleCommandButtonClick() {
    hideAllSections();
    previousSection = "command";
    document.getElementById("command-list-section").style.display = "block";
  }

  function handleTimezoneButtonClick() {
    hideAllSections();
    previousSection = "timezone";
    document.getElementById("timezone-section").style.display = "block";
  }

  function handleHardwareButtonClick() {
    hideAllSections();
    previousSection = "hardware";
    document.getElementById("hardware-section").style.display = "block";
  }

  function handleSaveDataButtonClick() {
    hideAllSections();
    previousSection = "save";
    document.getElementById("save-data-section").style.display = "block";
  }
  function createNewTab() {
    tabCount++;
    const tabId = `ticket-${tabCount}`;
    tabs.push(tabId);

    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.tab = tabId;
    tab.innerHTML = `
      <span class="tab-title">Ticket ${tabCount}</span>
      <span class="close-btn" title="Close Tab">&times;</span>
    `;
    tabsContainer.appendChild(tab);

    const content = document.createElement("div");
    content.classList.add("tab-content");
    content.dataset.tab = tabId;
    content.innerHTML = `
      <form>
        <div class="buttons">
          <button type="button" class="copy-summary">Copy Summary</button>
          <button type="button" class="copy-full">Copy Full Text</button>
          <button type="button" class="tech-esc">Technical Escalation</button>
          <button type="button" class="cust-esc">Customer Escalation</button>
          <button type="button" class="clear">Clear</button>
        </div>

        <div class="form-flex-container">
          <div class="form-left-column">
            <div class="form-row">
              <label for="caller-name-${tabId}">Callers First and Last Name:</label>
              <input type="text" id="caller-name-${tabId}" name="callerName" placeholder="Enter caller's full name" />
            </div>
            <div class="form-row">
              <label for="caller-phone-${tabId}">Callers Phone Number:</label>
              <input type="text" id="caller-phone-${tabId}" name="callerPhone" placeholder="Enter phone number" />
            </div>
            <div class="form-row">
              <label for="caller-email-${tabId}">Callers Email Address:</label>
              <input type="email" id="caller-email-${tabId}" name="callerEmail" placeholder="Enter email address" />
            </div>
            <div class="form-row">
              <label for="environment-${tabId}">Environment:</label>
              <select id="environment-${tabId}" name="environment">
                <option value="">-- Select Environment --</option>
                <option value="Hospitality / ENT">Hospitality / ENT</option>
                <option value="Common / Retail">Common / Retail</option>
                <option value="CTE / Lab">CTE / Lab</option>
                <option value="DeCa">DeCa</option>
              </select>
            </div>
            <div class="form-row">
              <label for="group-${tabId}">Group:</label>
              <select id="group-${tabId}" name="group">
                <option value="">-- Select Group --</option>
                <option value="SMB - Small Medium Business">SMB - Small Medium Business</option>
                <option value="ENT - Enterprise">ENT - Enterprise</option>
                <option value="RSG - Reseller">RSG - Reseller</option>
              </select>
            </div>
            <div class="form-row">
              <label for="company-number-${tabId}">Company Number:</label>
              <input type="text" id="company-number-${tabId}" name="companyNumber" />
            </div>
            <div class="form-row">
              <label for="store-number-${tabId}">Store Number:</label>
              <input type="text" id="store-number-${tabId}" name="storeNumber" />
            </div>
            <div class="form-row">
              <label for="aloha-key-${tabId}">Aloha Key:</label>
              <input type="text" id="aloha-key-${tabId}" name="alohaKey" />
            </div>
            <div class="form-row">
              <label for="summary-${tabId}">Summary:</label>
              <input type="text" id="summary-${tabId}" name="summary" />
            </div>
            <div class="form-row">
              <label for="ticket-number-${tabId}">Ticket Number:</label>
              <input type="text" id="ticket-number-${tabId}" name="ticketNumber" />
            </div>
            <div class="form-row">
              <label for="issue-date-${tabId}">Date when the issue was reported:</label>
              <input type="date" id="issue-date-${tabId}" name="issueDate" />
            </div>
            <div class="form-row">
              <label for="lanes-affected-${tabId}">Lane(s) Affected:</label>
              <input type="text" id="lanes-affected-${tabId}" name="lanesAffected" />
            </div>
            <div class="form-row">
              <label for="severity-${tabId}">Severity:</label>
              <select select id="severity-${tabId}" name="severity">
                <option value="">-- None --</option>
                  <option value="P1 - Critical">P1 - Critical</option>
                  <option value="P2 - High">P2 - High</option>
                  <option value="P3 - Medium">P3 - Medium</option>
                  <option value="P4 - Low">P4 - Low</option>
              </select>
            </div>
            <div class="form-row">
              <label for="mtx-pos-${tabId}">MTX_POS.dll version:</label>
              <input type="text" id="mtx-pos-${tabId}" name="mtxPos" />
            </div>
            <div class="form-row">
              <label for="mtx-eps-${tabId}">MTX_EPS.dll version:</label>
              <input type="text" id="mtx-eps-${tabId}" name="mtxEps" />
            </div>
            <div class="form-row">
              <label for="firmware-version-${tabId}">Firmware version:</label>
              <input type="text" id="firmware-version-${tabId}" name="firmwareVersion" />
            </div>
            <div class="form-row">
              <label for="os-version-${tabId}">OS version:</label>
              <input type="text" id="os-version-${tabId}" name="osVersion" />
            </div>
            <div class="form-row">
              <label for="pinpad-model-${tabId}">PIN Pad Model:</label>
              <input type="text" id="pinpad-model-${tabId}" name="pinpadModel" />
            </div>
            <div class="form-row">
              <label for="aps-version-${tabId}">APS version:</label>
              <input type="text" id="aps-version-${tabId}" name="apsVersion" />
            </div>
            <div class="form-row">
              <label for="pos-version-${tabId}">Aloha POS version:</label>
              <input type="text" id="pos-version-${tabId}" name="posVersion" />
            </div>
          </div>

          <div class="form-right-column">
            <label for="steps-performed-${tabId}">Steps performed to resolve the issue:</label>
            <textarea id="steps-performed-${tabId}" name="stepsPerformed" placeholder="Describe steps..."></textarea>
          </div>
        </div>
      </form>
    `;

    tabContents.appendChild(content);

    const ticketNumberInput = content.querySelector(`#ticket-number-${tabId}`);
    if (ticketNumberInput) {
      ticketNumberInput.addEventListener("input", (e) => {
        updateTabTitle(tab, e.target.value);
      });
    }

    setActiveTab(tabId);
    addTabEventListeners(tab, content);
  }

  function setActiveTab(tabId) {
    document.querySelectorAll("#tabs .tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === tabId);
    });
    document.querySelectorAll("#tab-contents > div").forEach((c) => {
      c.style.display = c.dataset.tab === tabId ? "block" : "none";
    });
  }

  function addTabEventListeners(tab, content) {
    tab.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-btn")) {
        e.stopPropagation();
        showConfirmModal(
          "Are you sure you want to close this tab?<br><small>All unsaved data will be lost.</small>",
          (confirmed) => {
            if (confirmed) {
              closeTab(tab.dataset.tab);
            }
          }
        );
      } else {
        setActiveTab(tab.dataset.tab);
      }
    });

    const form = content.querySelector("form");
    form.querySelector(".copy-summary").addEventListener("click", () => {
      const summary =
        form.querySelector('input[name="summary"]').value.trim() || "N/A";
      const companyNumber =
        form.querySelector('input[name="companyNumber"]').value.trim() || "N/A";
      const storeNumber =
        form.querySelector('input[name="storeNumber"]').value.trim() || "N/A";
      const alohaKey =
        form.querySelector('input[name="alohaKey"]').value.trim() || "N/A";
      const pinpadModel =
        form.querySelector('input[name="pinpadModel"]').value.trim() || "N/A";
      const firmwareVersion =
        form.querySelector('input[name="firmwareVersion"]').value.trim() ||
        "N/A";
      const apsVersion =
        form.querySelector('input[name="apsVersion"]').value.trim() || "N/A";

      const formattedText = `${summary} // CN ${companyNumber} // SN ${storeNumber} // CMCID ${alohaKey} // ${pinpadModel} // FW ${firmwareVersion} // APS ${apsVersion}`;
      copyToClipboard(formattedText);
    });

    form.querySelector(".copy-full").addEventListener("click", () => {
      const getValue = (selector) =>
        form.querySelector(selector)?.value.trim() || "";

      let fullText = `
Callers First and Last Name: ${getValue('input[name="callerName"]')}
Callers Phone Number: ${getValue('input[name="callerPhone"]')}
Callers Email Address: ${getValue('input[name="callerEmail"]')}
Environment: ${getValue('select[name="environment"]')}
Group: ${getValue('select[name="group"]')}
Company Number: ${getValue('input[name="companyNumber"]')}
Store Number: ${getValue('input[name="storeNumber"]')}
Aloha Key: ${getValue('input[name="alohaKey"]')}
Summary: ${getValue('input[name="summary"]')}
Ticket Number: ${getValue('input[name="ticketNumber"]')}
Date when the issue was reported: ${getValue('input[name="issueDate"]')}
Lane(s) Affected: ${getValue('input[name="lanesAffected"]')}
Severity: ${getValue('select[name="severity"]')}
MTX_POS.dll version: ${getValue('input[name="mtxPos"]')}
MTX_EPS.dll version: ${getValue('input[name="mtxEps"]')}
Firmware version: ${getValue('input[name="firmwareVersion"]')}
OS version: ${getValue('input[name="osVersion"]')}
PIN Pad Model: ${getValue('input[name="pinpadModel"]')}
APS version: ${getValue('input[name="apsVersion"]')}
Aloha POS version: ${getValue('input[name="posVersion"]')}
Steps performed to resolve the issue:
${getValue('textarea[name="stepsPerformed"]')}
      `.trim();

      copyToClipboard(fullText);
    });

    form.querySelector(".clear").addEventListener("click", () => {
      form.reset();
      const tabId = tab.dataset.tab;
      const tabElement = document.querySelector(`.tab[data-tab="${tabId}"]`);
      if (tabElement) {
        updateTabTitle(tabElement, "");
      }
    });
  }

  function closeTab(tabId) {
    const tab = document.querySelector(`#tabs .tab[data-tab="${tabId}"]`);
    const content = document.querySelector(
      `#tab-contents > div[data-tab="${tabId}"]`
    );
    if (tab) tab.remove();
    if (content) content.remove();

    const index = tabs.indexOf(tabId);
    if (index > -1) tabs.splice(index, 1);

    if (tab && tab.classList.contains("active")) {
      if (tabs.length > 0) {
        setActiveTab(tabs[tabs.length - 1]);
      } else {
        tabContents.innerHTML = "";
      }
    }
  }

  function updateTabTitle(tabElement, ticketNumber) {
    const tabTitleSpan = tabElement.querySelector(".tab-title");
    if (tabTitleSpan) {
      tabTitleSpan.textContent =
        ticketNumber && ticketNumber.trim() !== ""
          ? `Ticket ${ticketNumber.trim()}`
          : `Ticket ${
              Array.from(tabsContainer.children).indexOf(tabElement) + 1
            }`;
    }
  }

  function showConfirmModal(message, callback) {
    const modal = document.createElement("div");
    modal.className = "confirm-modal";

    const gifs = [
      "Images/gif-1.gif",
      "Images/gif-2.gif",
      "Images/gif-3.gif",
      "Images/gif-4.gif",
      "Images/gif-5.gif",
      "Images/gif-6.gif",
      "Images/gif-7.gif",
      "Images/gif-8.gif",
      "Images/gif-9.gif",
      "Images/gif-10.gif",
      "Images/gif-11.gif",
      "Images/gif-12.gif",
      "Images/gif-13.gif",
      "Images/gif-14.gif",
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    modal.innerHTML = `
      <div class="confirm-content">
        <div class="confirm-message">
          ${message}
          <div class="confirm-gif-container">
            <img src="${randomGif}" alt="Funny GIF" />
          </div>
        </div>
        <div class="confirm-buttons">
          <button class="confirm-btn confirm-btn-no">Cancel</button>
          <button class="confirm-btn confirm-btn-yes">Close Tab</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const yesBtn = modal.querySelector(".confirm-btn-yes");
    const noBtn = modal.querySelector(".confirm-btn-no");

    yesBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
      callback(true);
    });

    noBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
      callback(false);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
        callback(false);
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        document.body.removeChild(modal);
        callback(false);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    noBtn.focus();
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const notification = document.createElement("div");
        notification.className = "copy-notification";
        notification.textContent = "Copied to clipboard!";
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.remove();
        }, 2300);
      })
      .catch(() => {
        const notification = document.createElement("div");
        notification.className = "copy-notification";
        notification.style.backgroundColor = "#d32f2f";
        notification.innerHTML = "✗ Failed to copy!";
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.remove();
        }, 2300);
      });
  }

  document.querySelector(".rma-copy-summary").addEventListener("click", () => {
    const form = document.querySelector(".rma-form");
    const get = (name) =>
      form.querySelector(`[name="${name}"]`)?.value.trim() || "";

    const summary = `${get("issueSummary")} // CN ${get(
      "companyNumber"
    )} // SN ${get("storeNumber")} // CMCID ${get("alohaKey")} // FW ${get(
      "firmwareVersion"
    )} // ${get("pinpadModel")}`;
    copyToClipboard(summary);
  });

  document.querySelector(".rma-copy-ticket").addEventListener("click", () => {
    const form = document.querySelector(".rma-form");
    const get = (name) =>
      form.querySelector(`[name="${name}"]`)?.value.trim() || "";

    const ticket = `
Callers First and Last Name: ${get("callerName")}  
Callers Phone Number: ${get("callerPhone")}  
Callers Email Address: ${get("callerEmail")}  
  
Company Number: ${get("companyNumber")}  
Store Number: ${get("storeNumber")}  
Aloha Key: ${get("alohaKey")}  
Issue Summary: ${get("issueSummary")}  
PIN Pad Model: ${get("pinpadModel")}  
Firmware version: ${get("firmwareVersion")}  
Cable Type: ${get("cableType")}  
Error message on the PIN Pad: ${get("errorMessage")}  
Contractual SLA: ${get("sla")}  
  
Is the PIN Pad visible under COM port?: ${get("comPort")}  
USB Drivers up-to-date?: ${get("usbDrivers")}  
PIN Pad Power Drained?: ${get("powerDrained")}  
PIN Pad Swapped to a different terminal?: ${get("swapped")}  
PIN Pad working on another Terminal?: ${get("workingAnother")}
    `.trim();
    copyToClipboard(ticket);
  });

  document.querySelector(".rma-copy-teams").addEventListener("click", () => {
    const form = document.querySelector(".rma-form");
    const get = (name) =>
      form.querySelector(`[name="${name}"]`)?.value.trim() || "";

    const teamsText = `
@RMA Approvals  
Leadership please advise if I can proceed with creating a Dispatch (Work Order) or if there are additional steps that have to completed?  
  
Thanks in advance!  
  
Callers First and Last Name: ${get("callerName")}  
Callers Phone Number: ${get("callerPhone")}  
Callers Email Address: ${get("callerEmail")}  
  
Company Number: ${get("companyNumber")}  
Store Number: ${get("storeNumber")}  
Aloha Key: ${get("alohaKey")}  
Issue Summary: ${get("issueSummary")}  
PIN Pad Model: ${get("pinpadModel")}  
Firmware version: ${get("firmwareVersion")}  
Cable Type: ${get("cableType")}  
Error message on the PIN Pad: ${get("errorMessage")}  
Contractual SLA: ${get("sla")}  
  
Is the PIN Pad visible under COM port?: ${get("comPort")}  
USB Drivers up-to-date?: ${get("usbDrivers")}  
PIN Pad Power Drained?: ${get("powerDrained")}  
PIN Pad Swapped to a different terminal?: ${get("swapped")}  
PIN Pad working on another Terminal?: ${get("workingAnother")}
    `.trim();
    copyToClipboard(teamsText);
  });

  document.querySelector(".rma-clear").addEventListener("click", () => {
    document.querySelector(".rma-form").reset();
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tracking-btn")) {
      const carrier = e.target.parentElement
        .querySelector("img")
        .alt.replace(" Tracking", "");
      let trackingUrl;

      switch (carrier.toLowerCase()) {
        case "dhl":
          trackingUrl = "https://www.dhl.com/en/express/tracking.html";
          break;
        case "fedex":
          trackingUrl = "https://www.fedex.com/fedextrack/";
          break;
        case "ups":
          trackingUrl = "https://www.ups.com/track";
          break;
        default:
          trackingUrl = `https://www.google.com/search?q=${carrier}+tracking`;
      }

      window.open(trackingUrl, "_blank");
    }
  });
}

const issueTypeSelect = document.getElementById("sorr-issue-type");
const issueNotesContainer = document.getElementById("sorr-issue-notes");
const discrepancyFields = document.getElementById("sorr-discrepancy-fields");

issueTypeSelect.addEventListener("change", function () {
  issueNotesContainer.innerHTML = "";
  discrepancyFields.style.display = "none";

  switch (this.value) {
    case "Resubmission":
      issueNotesContainer.innerHTML = `
        <div class="note-box critical">
          <p>Please don't forget to attach the Resubmission Sheet Before Escalating the ticket to SORR Department!</p>
        </div>
      `;
      break;

    case "Discrepancy":
      issueNotesContainer.innerHTML = `
        <div class="note-box info">
          <p>Please make sure that there are no locally (approved) transactions on the Terminals and that they weren't settling by the failover settlement</p>
        </div>
      `;
      discrepancyFields.style.display = "block";

      setTimeout(() => {
        issueNotesContainer.innerHTML += `
          <div class="note-box warning">
            <p>If the case is escalated to SORR Department, make sure to attach PDR and RAW Export files in .csv format</p>
          </div>
        `;
      }, 100);
      break;

    case "Offline File Reprocessing":
      issueNotesContainer.innerHTML = `
        <div class="note-box warning">
          <p>Before uploading the files to DC1 Secure Server, please make sure that you downloaded the latest Journal file from the affected Terminal(s), KEK Encryption Key and the Offline file itself. Also delete the offline file once downloaded to your work-pc to avoid double reprocessing => double charges</p>
        </div>
      `;
      break;

    case "Settlement Issue":
      issueNotesContainer.innerHTML = `
        <div class="note-box info">
          <p>1) Make sure that there are no transactions stuck in the Offline file</p>
          <p>2) Verify that all of the Terminals configured as PIN Pad lanes in Configuration Management are Online. (Lanes defined as "NO PIN Pad" can be removed from ConMan, FYI)</p>
          <p>3) Check if there are transaction(s) stuck in the Offline Pending Report.</p>
          <p>4) Verify that there are no ".hld" or ".req" files stuck within C:\\CONNECTEDPAYMENTS folder on all Terminals.</p>
          <p>5) Check if the uptime of the BOH is over a week, as that can cause issues with the SettleCP event.</p>
          <br>
          <div class="note-box warning">
          <p>If none of the above helped, then you will have to review the Journals and Debouts. To simplify your root cause analysis, please follow these steps:</p>
          <br>
          <p>Ask the customer about their Settlement method if it's Manual or Automatic</p>
          <p>   If they Settle "Manually", ask which Terminal was used and the timestamp, and search for "ac130000" in the Journal.</p>
          <p>   If they Settle "Automatically, then review the Debout of the Master lane, and search the time on when the SettleCP event is configured from Events.cfg file.</p>
        </div>
        </div>
      `;
      break;
  }
});

document
  .getElementById("sorr-copy-summary")
  .addEventListener("click", function () {
    const callerName =
      document.getElementById("sorr-caller-name").value || "N/A";
    const companyNumber =
      document.getElementById("sorr-company-number").value || "N/A";
    const storeNumber =
      document.getElementById("sorr-store-number").value || "N/A";
    const alohaKey = document.getElementById("sorr-aloha-key").value || "N/A";
    const issueType = document.getElementById("sorr-issue-type").value || "N/A";

    const summary = `${issueType} // CN ${companyNumber} // SN ${storeNumber} // CMCID ${alohaKey}`;
    copyToClipboard(summary);
  });

document.getElementById("sorr-copy-all").addEventListener("click", function () {
  const getValue = (id) => document.getElementById(id).value.trim() || "N/A";
  const issueType = document.getElementById("sorr-issue-type").value;

  let fullText = `
Caller's Name: ${getValue("sorr-caller-name")}
Phone: ${getValue("sorr-caller-phone")}
Email: ${getValue("sorr-caller-email")}

Company Number: ${getValue("sorr-company-number")}
Store Number: ${getValue("sorr-store-number")}
Aloha Key: ${getValue("sorr-aloha-key")}

Issue Type: ${issueType}
  `.trim();

  if (issueType === "Discrepancy") {
    fullText += `
Start Date: ${getValue("sorr-start-date")}
End Date: ${getValue("sorr-end-date")}
Missing Amount: ${getValue("sorr-missing-amount")}
    `;
  }

  copyToClipboard(fullText);
});

document.getElementById("sorr-clear").addEventListener("click", function () {
  document.querySelectorAll("#sorr-section .form-input").forEach((input) => {
    input.value = "";
  });
  document.getElementById("sorr-issue-type").value = "";
  issueNotesContainer.innerHTML = "";
  discrepancyFields.style.display = "none";
});

document.getElementById("btn-timezone").addEventListener("click", function () {
  document
    .querySelectorAll("section")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById("timezone-section").style.display = "block";
});

document.getElementById("btn-timezone").addEventListener("click", function () {
  document
    .querySelectorAll("section")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById("timezone-section").style.display = "block";
});

document.getElementById("convert-time").addEventListener("click", function () {
  const inputTime = document.getElementById("input-time").value;
  const fromZone = document.getElementById("input-zone").value;
  const outputSelect = document.getElementById("output-zones");
  const selectedZones = Array.from(outputSelect.selectedOptions).map(
    (o) => o.value
  );
  const outputDiv = document.getElementById("converted-times");
  outputDiv.innerHTML = "";

  if (!inputTime) {
    outputDiv.innerHTML = "<p>Please enter a date and time.</p>";
    return;
  }

  const date = new Date(inputTime);

  const formatTime = (date, tz) => {
    const options = {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat([], options).format(date);
  };

  selectedZones.forEach((zone) => {
    outputDiv.innerHTML += `<p class="tmz-output"><strong>${zone}:</strong> ${formatTime(
      date,
      zone
    )}</p>`;
  });
});

const hardwareFilterButtons = document.querySelectorAll(
  ".hardware-section .filter-btn"
);
const hardwareGalleryItems = document.querySelectorAll(
  ".hardware-section .gallery-item"
);

hardwareFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    hardwareGalleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "inline-block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

const commands = [
  {
    name: "System Up-Time",
    desc: "Command to View Device UpTime",
    cmd: "net stats srv",
    type: "info",
  },
  {
    name: "Network Config",
    desc: "Command to Check Network Configuration",
    cmd: "ipconfig /all",
    type: "network",
  },
  {
    name: "Check Firewall",
    desc: "Command to Check the Status of Windows Firewall",
    cmd: "netsh advfirewall show allprofiles",
    type: "network",
  },
  {
    name: "Disable Firewall",
    desc: "Command to Disable Windows Firewall",
    cmd: "netsh advfirewall set allprofiles state off",
    type: "network",
  },
  {
    name: "Checking UAC",
    desc: "Command to Check UAC Status",
    cmd: "REG QUERY HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\ /v EnableLUA",
    type: "system",
  },
  {
    name: "Disable UAC",
    desc: "Command to Disable UAC",
    cmd: "reg ADD HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v EnableLUA /t REG_DWORD /d 0 /f",
    type: "system",
  },
  {
    name: "KEK Key",
    desc: "Command to Pull the KEK Key",
    cmd: "reg query hklm\\software\\mtxeps\\openepsnet\\00",
    type: "system",
  },
  {
    name: "EDC Path",
    desc: "Command to correct EDC Path on FOH",
    cmd: 'setx EDCPath "C:\\CONNECTEDPAYMENTS" /m',
    type: "system",
  },
  {
    name: "EDC Path Removal",
    desc: "Command to remove EDC Path on FOH/BOH",
    cmd: 'setx EDCPath "" /m',
    type: "system",
  },
  {
    name: "Checking COM ports",
    desc: "Command to view what is plugged to each COM port",
    cmd: "reg query HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM",
    type: "system",
  },
  {
    name: "Checking Virtualization",
    desc: "Command to check if Virtualization is set to 0 or 1",
    cmd: "reg query hklm\\software\\microsoft\\windows\\currentversion\\policies\\system",
    type: "system",
  },
  {
    name: "Disable Virtualization",
    desc: "Command to Set Virtualization value to 0 in the Registry",
    cmd: "reg add hklm\\software\\microsoft\\windows\\currentversion\\policies\\system /v EnableVirtualization /t REG_DWORD /d 0 /f",
    type: "system",
  },
  {
    name: "Route Delete",
    desc: "Command to Remove DNS and DG from FOH",
    cmd: "route delete 0.0.0.0",
    type: "network",
  },
  {
    name: "Whitelist APS",
    desc: "Command to Whitelist the APS Folder",
    cmd: 'C:\\Windows\\SysNative\\WindowsPowerShell\\v1.0\\powershell.exe Add-MpPreference -ExclusionPath "C:\\BootDrv\\APS"',
    type: "system",
  },
  {
    name: "Whitelist Micro Trax",
    desc: "Command to Whitelist the Micro Trax Folder",
    cmd: "C:\\Windows\\SysNative\\WindowsPowerShell\\v1.0\\powershell.exe Add-MpPreference -ExclusionPath 'C:\\Program Files\\MicroTrax\\'",
    type: "system",
  },
  {
    name: "Windows Defender List",
    desc: "Command to View what is Blocked by Windows Defender",
    cmd: "C:\\Windows\\SysNative\\WindowsPowerShell\\v1.0\\powershell.exe Get-MpPreference",
    type: "system",
  },
  {
    name: "Manual APS Start",
    desc: "Command to manually start APS Service",
    cmd: "C:\\BootDrv\\APS\\AlohaPaymentService.exe runasexe nowindow",
    type: "system",
  },
  {
    name: "Equinox Driver Version",
    desc: "Command to check Equinox Driver version",
    cmd: 'wmic product where name="USB/COM DRIVER" get version /value',
    type: "info",
  },
  {
    name: "Verifone Driver Version",
    desc: "Command to check Verifone Driver version",
    cmd: "wmic product where \"name like '%%verifone%%'\" get Name, version",
    type: "info",
  },
];

const commandList = document.getElementById("command-list");
const filterButtons = document.querySelectorAll(".command-filter-btn");

function renderCommands(filter = "all") {
  commandList.innerHTML = "";
  const filtered = commands.filter(
    (c) => filter === "all" || c.type === filter
  );
  filtered.forEach((c) => {
    const item = document.createElement("div");
    item.classList.add("command-item", c.type);
    item.innerHTML = `
      <div class="command-content">
        <span class="command-text" style="flex:1;font-weight:600;">${c.name}</span>
        <span class="command-text" style="flex:2;text-align:center;font-size:0.95rem;color:#ccc;">${c.desc}</span>
        <button class="command-copy-btn" data-command="${c.cmd}">Copy</button>
      </div>
    `;
    commandList.appendChild(item);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderCommands(filter);
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("command-copy-btn")) {
    const command = e.target.getAttribute("data-command");
    navigator.clipboard.writeText(command).then(() => {
      e.target.innerText = "Copied!";
      setTimeout(() => (e.target.innerText = "Copy"), 1000);
    });
  }
});

renderCommands();

const dataInput = document.getElementById("data-input");
const saveBtn = document.getElementById("btn-save");
const saveMessage = document.getElementById("save-message");
const saveDataContainer = document.getElementById("save-data-container");

window.addEventListener("load", () => {
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  renderDataCards(savedItems);
});

function saveData() {
  const data = dataInput.value.trim();
  if (!data) {
    saveMessage.textContent = "Enter data before saving!";
    return;
  }

  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  savedItems.push(data);
  localStorage.setItem("savedItems", JSON.stringify(savedItems));

  renderDataCards(savedItems);
  saveMessage.textContent = `Data saved: ${data}`;
  dataInput.value = "";
}

function renderDataCards(items) {
  saveDataContainer.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("save-data-card");

    const text = document.createElement("div");
    text.textContent = item;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.backgroundColor = "#222";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.border = "1px solid #9968ff";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => deleteData(index));

    card.appendChild(text);
    card.appendChild(deleteBtn);

    setTimeout(() => {
      card.style.opacity = "1";
    }, 50 * index);

    saveDataContainer.appendChild(card);
  });
}

function deleteData(index) {
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  const removed = savedItems.splice(index, 1);
  localStorage.setItem("savedItems", JSON.stringify(savedItems));
  renderDataCards(savedItems);
  saveMessage.textContent = `Deleted: ${removed}`;
}

saveBtn.addEventListener("click", saveData);

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("tech-esc")) return;

  const form = e.target.closest("form");
  if (!form) return;

  function getValue(selector) {
    const el = form.querySelector(selector);
    return el && el.value.trim() !== "" ? el.value.trim() : "N/A";
  }

  const environment = getValue('select[name="environment"]');
  const pillar = getValue('select[name="group"]');
  const companyId = getValue('input[name="companyNumber"]');
  const storeId = getValue('input[name="storeNumber"]');
  const alohaKey = getValue('input[name="alohaKey"]');
  const ticketNumber = getValue('input[name="ticketNumber"]');
  const issueSummary = getValue('input[name="summary"]');
  const issueDate = getValue('input[name="issueDate"]');
  const lanes = getValue('input[name="lanesAffected"]');
  const severity = getValue('select[name="severity"]');
  const mtxPos = getValue('input[name="mtxPos"]');
  const mtxEps = getValue('input[name="mtxEps"]');
  const firmware = getValue('input[name="firmwareVersion"]');
  const osVersion = getValue('input[name="osVersion"]');
  const pinpadModel = getValue('input[name="pinpadModel"]');
  const apsVersion = getValue('input[name="apsVersion"]');
  const posVersion = getValue('input[name="posVersion"]');
  const steps = getValue('textarea[name="stepsPerformed"]');

  const subject = encodeURIComponent(
    `L3 Tech Escalation // Ticket ${ticketNumber} // CN ${companyId} // SN ${storeId} // CMCID ${alohaKey}`
  );

  const body = encodeURIComponent(
    `Environment: ${environment}
Pillar: ${pillar}
CompanyID: ${companyId}
StoreID: ${storeId}
Aloha Key: ${alohaKey}
Ticket Number: ${ticketNumber}
Issue Summary: ${issueSummary}
Date when it stopped working: ${issueDate}
Number of affected lanes: ${lanes}
Severity: ${severity}
MTX_POS.dll Version: ${mtxPos}
MTX_EPS.dll Version: ${mtxEps}
PIN Pad Firmware Version: ${firmware}
PIN Pad OS Version: ${osVersion}
PIN Pad Model: ${pinpadModel}
APS Version: ${apsVersion}
Aloha POS Version: ${posVersion}

Steps taken to resolve the issue:

${steps}`
  );

  const mailto = `mailto:SR230239@ncrvoyix.com?cc=CS230307@ncrvoyix.com&subject=${subject}&body=${body}`;

  window.location.href = mailto;
});

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("cust-esc")) return;

  const form = e.target.closest("form");
  if (!form) return;

  function getValue(selector) {
    const el = form.querySelector(selector);
    return el && el.value.trim() !== "" ? el.value.trim() : "N/A";
  }

  const environment = getValue('select[name="environment"]');
  const pillar = getValue('select[name="group"]');
  const companyId = getValue('input[name="companyNumber"]');
  const storeId = getValue('input[name="storeNumber"]');
  const alohaKey = getValue('input[name="alohaKey"]');
  const ticketNumber = getValue('input[name="ticketNumber"]');
  const issueSummary = getValue('input[name="summary"]');
  const issueDate = getValue('input[name="issueDate"]');
  const lanes = getValue('input[name="lanesAffected"]');
  const severity = getValue('select[name="severity"]');
  const mtxPos = getValue('input[name="mtxPos"]');
  const mtxEps = getValue('input[name="mtxEps"]');
  const firmware = getValue('input[name="firmwareVersion"]');
  const osVersion = getValue('input[name="osVersion"]');
  const pinpadModel = getValue('input[name="pinpadModel"]');
  const apsVersion = getValue('input[name="apsVersion"]');
  const posVersion = getValue('input[name="posVersion"]');
  const steps = getValue('textarea[name="stepsPerformed"]');

  const subject = encodeURIComponent(
    `L3 Cust Escalation // Ticket ${ticketNumber} // CN ${companyId} // SN ${storeId} // CMCID ${alohaKey}`
  );

  const body = encodeURIComponent(
    `Environment: ${environment}
Pillar: ${pillar}
CompanyID: ${companyId}
StoreID: ${storeId}
Aloha Key: ${alohaKey}
Ticket Number: ${ticketNumber}
Issue Summary: ${issueSummary}
Date when it stopped working: ${issueDate}
Number of affected lanes: ${lanes}
Severity: ${severity}
MTX_POS.dll Version: ${mtxPos}
MTX_EPS.dll Version: ${mtxEps}
PIN Pad Firmware Version: ${firmware}
PIN Pad OS Version: ${osVersion}
PIN Pad Model: ${pinpadModel}
APS Version: ${apsVersion}
Aloha POS Version: ${posVersion}

Steps taken to resolve the issue:

${steps}`
  );

  const mailto = `mailto:SR230239@ncrvoyix.com?cc=CS230307@ncrvoyix.com&subject=${subject}&body=${body}`;

  window.location.href = mailto;
});
