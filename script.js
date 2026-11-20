
const subjects = [
    { id: "english", name: "Communication Skills 1" },
    { id: "mathematics", name: "Engineering Mathematics" },
    { id: "science", name: "Logical Reasoning" },
    { id: "computer-science", name: "Web devlopment" },
    { id: "social-studies", name: "ICP" }
];

function calculateGrade(percentage) {
    if (percentage >= 90) {
        return "A+";
    } else if (percentage >= 80) {
        return "A";
    } else if (percentage >= 70) {
        return "B";
    } else if (percentage >= 60) {
        return "C";
    } else if (percentage >= 50) {
        return "D";
    } else if (percentage >= 35) {
        return "E";
    } else {
        return "Fail";
    }
}

function checkPassStatus(marks) {
    return marks.every(mark => mark >= 35);
}

function calculateTotal(marks) {
    return marks.reduce((total, mark) => total + mark, 0);
}

function calculatePercentage(total) {
    return (total / 500) * 100;
}

function calculateAverage(total) {
    return total / 5;
}

function validateStudentDetails() {
    const studentName = document.getElementById("student-name").value.trim();
    const marks = subjects.map(subject =>
        document.getElementById(subject.id).value.trim()
    );

    if (studentName === "") {
        alert("Please enter the student name.");
        return false;
    }

    for (let i = 0; i < marks.length; i++) {
        if (marks[i] === "") {
            alert("Please enter marks for " + subjects[i].name + ".");
            return false;
        }

        const mark = Number(marks[i]);

        if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
            alert("Marks for " + subjects[i].name + " must be between 0 and 100.");
            return false;
        }
    }

    if (!document.getElementById("confirm-details").checked) {
        alert("Please confirm the student details.");
        return false;
    }

    return true;
}

const resultForm = document.getElementById("result-form");

resultForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateStudentDetails()) {
        return;
    }

    const studentName = document.getElementById("student-name").value.trim();

    const marks = subjects.map(subject =>
        Number(document.getElementById(subject.id).value)
    );

    const total = calculateTotal(marks);
    const percentage = calculatePercentage(total);
    const average = calculateAverage(total);
    const grade = calculateGrade(percentage);
    const isPassed = checkPassStatus(marks);

    document.getElementById("result-student-name").textContent = studentName;
    document.getElementById("total-marks").textContent = total + " / 500";
    document.getElementById("percentage").textContent = percentage.toFixed(2) + "%";
    document.getElementById("average").textContent = average.toFixed(2);
    document.getElementById("grade").textContent = isPassed ? grade : "Fail";

    const subjectResults = document.getElementById("subject-results");
    subjectResults.innerHTML = "";

    subjects.forEach(function(subject, index) {
        const row = document.createElement("tr");

        const subjectCell = document.createElement("td");
        subjectCell.textContent = subject.name;

        const marksCell = document.createElement("td");
        marksCell.textContent = marks[index];

        const statusCell = document.createElement("td");
        statusCell.textContent = marks[index] >= 35 ? "Pass" : "Fail";

        row.appendChild(subjectCell);
        row.appendChild(marksCell);
        row.appendChild(statusCell);

        subjectResults.appendChild(row);
    });

    document.getElementById("result-section").hidden = false;
});
