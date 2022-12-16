const jobList = document.querySelector(".list-jobs");
const selectedJobs = document.querySelector(".list__select-jobs");
const ofSelectJobs = document.querySelector(".on");

function renderJob(jobData, parentElement) {
  const jobCard = document.createElement("li");
  const titleJobs = document.createElement("span");
  const tags = document.createElement("div");
  const infoEnterprise = document.createElement("span");
  const infoLocation = document.createElement("span");
  const separationDescription = document.createElement("div");
  const descriptionJob = document.createElement("p");
  const modalities = document.createElement("div");
  const jobCardFooter = document.createElement("div");
  const modalityOne = document.createElement("span");
  const modalityTwo = document.createElement("span");
  const btn = document.createElement("button");

  jobCard.classList.add("item__list-jobs");
  titleJobs.classList.add("title-jobs");
  titleJobs.classList.add("subtitle");
  tags.classList.add("tags");
  infoEnterprise.classList.add("job-tag");
  infoLocation.classList.add("job-tag");
  descriptionJob.classList.add("job-description");
  modalities.classList.add("modalities");
  jobCardFooter.classList.add("jobcard-footer");
  modalityOne.classList.add("job-modality");
  modalityTwo.classList.add("job-modality");
  btn.classList.add("button-apply");
  btn.id = `btn-${jobData.id}`;

  titleJobs.innerHTML = jobData.title;
  infoEnterprise.innerHTML = jobData.enterprise;
  infoLocation.innerHTML = jobData.location;
  descriptionJob.innerHTML = jobData.descrition;
  modalityOne.innerHTML = jobData.modalities[0];
  modalityTwo.innerHTML = jobData.modalities[1];
  btn.innerHTML = "Candidatar";

  btn.addEventListener("click", () => {
    if (btn.innerHTML === "Candidatar") {
      localStorage.setItem(jobData.id, JSON.stringify(jobData));
      btn.innerHTML = "Remover Candidatura";
    } else {
      localStorage.removeItem(jobData.id);
      btn.innerHTML = "Candidatar";
    }
    renderSelectedJobs();
  });

  parentElement.appendChild(jobCard);
  tags.append(infoEnterprise, infoLocation);
  separationDescription.appendChild(descriptionJob);
  modalities.append(modalityOne, modalityTwo);
  jobCardFooter.append(modalities, btn);
  jobCard.append(titleJobs, tags, separationDescription, jobCardFooter);
}

function renderSelectedJobs() {
  selectedJobs.innerHTML = "";
  let result = jobsData
    .filter((jobData) => localStorage.getItem(jobData.id) !== null)
    .map((jobData) => {
      const cardSelectJob = document.createElement("li");
      const separationIten = document.createElement("div");
      const headerItem = document.createElement("div");
      const titleSeletJob = document.createElement("span");
      const icon = document.createElement("i");
      const infoSelect = document.createElement("div");
      const selectEnterprise = document.createElement("span");
      const selectLocation = document.createElement("span");

      for (const cls of ["icon", "fa-solid", "fa-trash"]) {
        icon.classList.add(cls);
      }

      cardSelectJob.classList.add("item__select-job");
      separationIten.classList.add("div");
      headerItem.classList.add("header__select-job");
      titleSeletJob.classList.add("title__select-job");
      infoSelect.classList.add("tags");
      selectEnterprise.classList.add("info__select-job");
      selectLocation.classList.add("info__select-job");

      titleSeletJob.innerHTML = jobData.title;
      selectEnterprise.innerHTML = jobData.enterprise;
      selectLocation.innerHTML = jobData.location;

      icon.addEventListener("click", () => {
        const childNodes = [...selectedJobs.childNodes];
        selectedJobs.innerHTML = "";
        childNodes.filter(child => child != cardSelectJob).forEach(child => {
          selectedJobs.appendChild(child);
        })
        if (selectedJobs.childNodes.length) {
          ofSelectJobs.classList.remove("on");
          ofSelectJobs.classList.add("off");
        } else {
          ofSelectJobs.classList.remove("off");
          ofSelectJobs.classList.add("on");
        }
        document.querySelector(`#btn-${jobData.id}`).textContent = "Candidatar";
        localStorage.removeItem(jobData.id);
      });

      selectedJobs.appendChild(cardSelectJob);
      cardSelectJob.append(separationIten, infoSelect);
      separationIten.appendChild(headerItem);
      headerItem.append(titleSeletJob, icon);
      infoSelect.append(selectEnterprise, selectLocation);
      return 1;
    });

  if (result.length) {
    selectedJobs.classList.remove("list__selected-jobs-hide");
    selectedJobs.classList.add("list__selected-jobs-show");
    ofSelectJobs.classList.remove("on");
    ofSelectJobs.classList.add("off");
  } else {
    selectedJobs.classList.remove("list__selected-jobs-show");
    selectedJobs.classList.add("list__selected-jobs-hide");
    ofSelectJobs.classList.remove("off");
    ofSelectJobs.classList.add("on");
  }
}

jobsData.map((jobdata) => renderJob(jobdata, jobList));
