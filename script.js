document.addEventListener("DOMContentLoaded", () => {
    // Function to show the selected tab content and hide others
    function showTab(tabId) {
        // Deactivate all tabs and hide all content sections
        const tabs = document.querySelectorAll(".tab-link");
        const contents = document.querySelectorAll(".tab-content");

        tabs.forEach((tab) => tab.classList.remove("active"));
        contents.forEach((content) => {
            content.classList.remove("active");
            content.style.display = "none";
        });

        // Activate the selected tab and show its content
        document.querySelector(`.tab-link[onclick="showTab('${tabId}')"]`).classList.add("active");
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add("active");
        activeContent.style.display = "block";
    }

    // Initialize by showing the "about" tab content by default
    showTab("about");
});
