// script.js
async function getRecipes(type, value) {
  try {
    const response = await fetch("http://localhost:3000/get-recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value })
    });

    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    if (data.error) {
      resultsDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
    } else {
      resultsDiv.innerHTML = `
        <h3>Recipes for ${data.type} → ${data.value}:</h3>
        <ul>
          ${data.recipes.map(r => `<li>${r}</li>`).join("")}
        </ul>
      `;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("results").innerHTML =
      "<p style='color:red;'>Could not connect to backend.</p>";
  }
}