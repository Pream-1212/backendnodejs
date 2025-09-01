
    // Save Manager
    document.getElementById("managerForm").addEventListener("submit", function(e){
      e.preventDefault();
      const manager = {
        name: document.getElementById("managerName").value,
        email: document.getElementById("managerEmail").value,
        password: document.getElementById("managerPassword").value
      };
      localStorage.setItem("manager", JSON.stringify(manager));
      alert("Manager Registered!");
      this.reset();
    });

    // Save Sales Agent
    document.getElementById("agentForm").addEventListener("submit", function(e){
      e.preventDefault();
      const agent = {
        name: document.getElementById("agentName").value,
        phone: document.getElementById("agentPhone").value,
        password: document.getElementById("agentPassword").value
      };
      let agents = JSON.parse(localStorage.getItem("agents")) || [];
      agents.push(agent);
      localStorage.setItem("agents", JSON.stringify(agents));
      alert("Sales Agent Registered!");
      this.reset();
    });

    // Save Stock
    document.getElementById("stockForm").addEventListener("submit", function(e){
      e.preventDefault();
      const stockItem = {
        product: document.getElementById("productName").value,
        type: document.getElementById("productType").value,
        cost: document.getElementById("costPrice").value,
        price: document.getElementById("sellPrice").value,
        quantity: document.getElementById("quantity").value,
        supplier: document.getElementById("supplierName").value,
        quality: document.getElementById("quality").value,
        color: document.getElementById("color").value,
        measurements: document.getElementById("measurements").value,
        date: new Date().toLocaleDateString()
      };
      let stock = JSON.parse(localStorage.getItem("stock")) || [];
      stock.push(stockItem);
      localStorage.setItem("stock", JSON.stringify(stock));
      alert("Stock Added!");
      this.reset();
    });
  
