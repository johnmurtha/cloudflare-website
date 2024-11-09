document.addEventListener("DOMContentLoaded", function () {
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
        const activeTab = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add("active");
        }

        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add("active");
            activeContent.style.display = "block";
        }
    }

    // Initialize by showing the "about" tab content by default
    showTab("about");

    // Attach event listeners for the tab buttons
    const tabButtons = document.querySelectorAll(".tab-link");
    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const tabId = button.getAttribute("data-tab");
            showTab(tabId);
        });
    });
});
