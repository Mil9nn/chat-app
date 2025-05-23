function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const isPM = hours >= 12;
  const formattedHours = ((hours + 11) % 12 + 1); // Converts 0-23 to 1-12
  const ampm = isPM ? "PM" : "AM";

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

export default formatTime;