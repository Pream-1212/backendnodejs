const roleSelect = document.getElementById("role");
const extraFields = document.getElementById("extraFields");

roleSelect.addEventListener("change", function () {
  const role = roleSelect.value;
  extraFields.innerHTML = ""; // clear previous fields

  if (role === "customer") {
    extraFields.innerHTML = `
          <div class="mb-3">
            <label class="form-label">Company Name</label>
            <input type="text" class="form-control" id="companyName" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Address</label>
            <input type="text" class="form-control" id="address" required>
          </div>
        `;
  }

  if (role === "supplier") {
    extraFields.innerHTML = `
          <div class="mb-3">
            <label class="form-label">Supplier Company</label>
            <input type="text" class="form-control" id="supplierCompany" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Product Type</label>
            <input type="text" class="form-control" id="productType" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Address</label>
            <input type="text" class="form-control" id="supplierAddress" required>
          </div>
        `;
  }

  if (role === "manager" || role === "attendant") {
    extraFields.innerHTML = `
          <div class="mb-3">
            <label class="form-label">Staff ID</label>
            <input type="text" class="form-control" id="staffId" placeholder="System can auto-generate if empty">
          </div>
        `;
  }
});

// Handle form submission
const form = document.getElementById("signUpForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  let extraData = {};

  if (role === "customer") {
    extraData = {
      companyName: document.getElementById("companyName").value,
      address: document.getElementById("address").value,
    };
  }

  if (role === "supplier") {
    extraData = {
      supplierCompany: document.getElementById("supplierCompany").value,
      productType: document.getElementById("productType").value,
      address: document.getElementById("supplierAddress").value,
    };
  }

  if (role === "manager" || role === "attendant") {
    extraData = {
      staffId:
        document.getElementById("staffId").value || `STAFF-${Date.now()}`,
    };
  }

  const newUser = { name, email, phone, password, role, ...extraData };

  // Save user in localStorage (for demo)
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully for role: " + role);
  form.reset();
  extraFields.innerHTML = ""; // reset extra fields
});
