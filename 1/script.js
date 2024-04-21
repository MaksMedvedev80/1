document.addEventListener("DOMContentLoaded", function() {
    const initialData = [
        {
            "id": 1,
            "name": "Йога",
            "time": "10:00 - 11:00",
            "maxParticipants": 15,
            "currentParticipants": 8
        },
        {
            "id": 2,
            "name": "Пилатес",
            "time": "11:30 - 12:30",
            "maxParticipants": 10,
            "currentParticipants": 5
        },
        {
            "id": 3,
            "name": "Кроссфит",
            "time": "13:00 - 14:00",
            "maxParticipants": 20,
            "currentParticipants": 15
        },
        {
            "id": 4,
            "name": "Танцы",
            "time": "14:30 - 15:30",
            "maxParticipants": 12,
            "currentParticipants": 10
        },
        {
            "id": 5,
            "name": "Бокс",
            "time": "16:00 - 17:00",
            "maxParticipants": 8,
            "currentParticipants": 6
        }
    ];

    // Проверка, сохранены ли данные в localStorage, и если нет, сохраняем начальные данные
    if (!localStorage.getItem("scheduleData")) {
        localStorage.setItem("scheduleData", JSON.stringify(initialData));
    }

    const scheduleData = JSON.parse(localStorage.getItem("scheduleData"));

    const tableBody = document.querySelector("#schedule tbody");

    function renderSchedule() {
        tableBody.innerHTML = "";
        scheduleData.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.time}</td>
                <td>${entry.maxParticipants}</td>
                <td>${entry.currentParticipants}</td>
                <td>
                    <button class="register-btn" data-id="${entry.id}" ${entry.currentParticipants >= entry.maxParticipants ? "disabled" : ""}>Записаться</button>
                    <button class="cancel-btn" data-id="${entry.id}" ${entry.currentParticipants <= 0 ? "disabled" : ""}>Отменить запись</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Добавляем обработчики событий для кнопок "Записаться" и "Отменить запись"
        const registerButtons = document.querySelectorAll(".register-btn");
        const cancelButtons = document.querySelectorAll(".cancel-btn");

        registerButtons.forEach(button => {
            button.addEventListener("click", function() {
                const id = parseInt(this.getAttribute("data-id"));
                register(id);
            });
        });

        cancelButtons.forEach(button => {
            button.addEventListener("click", function() {
                const id = parseInt(this.getAttribute("data-id"));
                cancel(id);
            });
        });
    }

    function register(id) {
        const entry = scheduleData.find(item => item.id === id);
        if (entry.currentParticipants < entry.maxParticipants) {
            entry.currentParticipants++;
            saveData();
            renderSchedule();
        }
    }

    function cancel(id) {
        const entry = scheduleData.find(item => item.id === id);
        if (entry.currentParticipants > 0) {
            entry.currentParticipants--;
            saveData();
            renderSchedule();
        }
    }

    function saveData() {
        localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    }

    renderSchedule();
});
