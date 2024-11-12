

export function masterData() {
    const fklDepartmentId = localStorage.getItem("fklDepartmentId")
  return fetch(`https://convergence-upload.skillmissionassam.org/nw/master/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fklDepartmentId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched master data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching master data:", error);
    });
}
