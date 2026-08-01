document.addEventListener("DOMContentLoaded", () => {


    const buttons = document.querySelectorAll(
        ".bottom-nav button"
    );


    const pages = document.querySelectorAll(
        ".page"
    );



    buttons.forEach(button => {


        button.addEventListener("click", () => {


            const target =
            button.dataset.page;



            // Hide all pages

            pages.forEach(page => {

                page.classList.remove("active");

            });



            // Show selected page

            document
            .getElementById(target)
            .classList.add("active");



            // Update selected button

            buttons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");



            // Load page data

            if(target === "history"){

                loadHistory();

            }


            if(target === "settings"){

                loadSettingsPage();

            }


            if(target === "charts"){

                loadCharts();

            }



        });


    });


});
initDashboard();
