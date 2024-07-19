export const validateAgeAndGender = ( bYear, bMonth, bDay, gender ) => {
    console.log(bYear, bMonth)
    const currentDate = new Date();
    const pickDate = new Date(bYear, bMonth - 1, bDay);
    let age = currentDate.getFullYear() - pickDate.getFullYear();
    const monthDifference = currentDate.getMonth() - pickDate.getMonth();
    const dayDifference = currentDate.getDate() - pickDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    if (age < 14) {
        return "It looks like you're not eligible to join Facebook";
    } else if (age > 70) {
        return "You're too old to join Facebook"
    } else if (gender === "") {
        return "Please choose a gender but later you can change who can see it"

    } else {
        return null
    }
};