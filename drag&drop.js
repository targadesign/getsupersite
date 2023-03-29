const dropZone = document.querySelector(".drop-zone");
const dropZoneStyle = document.querySelector(".drop-zone-style");
const fileInput = document.querySelector("#logo-image");
const fileInfo = document.querySelector("#file-info");
const fileInfoSize = document.querySelector(".file-info_validation-size");
const fileInfoExt = document.querySelector(".file-info_validation-ext");

// Set the initial state of the file-info container
fileInfo.style.display = "none";

dropZone.addEventListener("click", function() {
  fileInput.click();
});

fileInput.addEventListener("change", function() {
  const files = fileInput.files;
  handleFiles(files);
});

dropZoneStyle.addEventListener("dragover", function(e) {
  e.preventDefault();
  dropZoneStyle.classList.add("drop-zone_over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneStyle.addEventListener(type, function() {
    dropZoneStyle.classList.remove("drop-zone_over");
  });
});

dropZoneStyle.addEventListener("drop", function(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  handleFiles(files);
  dropZoneStyle.classList.remove("drop-zone_over");
  dropZoneStyle.classList.add("drop-zone_dropped");
});

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const fileExt = fileName.split(".").pop();
    const validExtensions = ["svg"];
    const fileSize = (file.size / (1024*1024)).toFixed(2);
    
    if (fileSize > 4) {
      fileInfoSize.style.display = "block";
      fileInput.value = null;
      return;
    } else if (!validExtensions.includes(fileExt)) {
      fileInfoExt.style.display = "block";
      fileInput.value = null;
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      fileInfo.style.display = "block"; // Add this line to show the fileInfo container
      dropZone.style.display = "none";  // Add this line to hide the dropZone container
      
      const imgSrc = reader.result;
      const fileInfoEl = fileInfo;
      fileInfoEl.classList.remove("file-info-template");
      const fileImgContainerEl = fileInfoEl.querySelector(".file-info_img-container");
      const fileImgEl = fileImgContainerEl.querySelector(".file-info_img");
      fileImgEl.setAttribute("src", imgSrc);
      const img = new Image();
      img.src = imgSrc;
      img.onload = function() {
        const containerWidth = fileImgContainerEl.offsetWidth;
        const containerHeight = fileImgContainerEl.offsetHeight;
        const imgWidth = img.width;
        const imgHeight = img.height;
        if (imgWidth > containerWidth || imgHeight > containerHeight) {
          const ratio = Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
          fileImgEl.style.width = `${imgWidth * ratio}px`;
          fileImgEl.style.height = `${imgHeight * ratio}px`;
        } else {
          fileImgEl.style.width = `${imgWidth}px`;
          fileImgEl.style.height = `${imgHeight}px`;
        }
      }
      const fileInfoNameEl = fileInfoEl.querySelector(".file-info_name");
      fileInfoNameEl.innerHTML = fileName;
      const fileInfoSizeEl = fileInfoEl.querySelector(".file-info_size");
      fileInfoSizeEl.innerHTML = fileSize + " MB";
      const fileInfoRemoveBtnEl = fileInfoEl.querySelector(".file-info_remove-btn");
      fileInfoRemoveBtnEl.addEventListener("click", function() {
        fileInfo.style.display = "none";
        dropZone.style.display = "block";
        fileInput.value = null;
        fileInfoSize.style.display = "none";
        fileInfoExt.style.display = "none";
        
        // Restore the drop-zone background when a file is deleted
        dropZoneStyle.classList.remove("drop-zone_dropped");
      });
    };
  }
}