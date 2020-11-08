const PhotosUpload = {
  preview: document.querySelector("#photos-preview"),
  uploadLimit: 5,
  files: [],
  input: "",
  handleFileInput(event) {
    const { files: fileList } = event.target;
    const {
      preview,
      getContainer,
      hasLimit,
      files,
      getAllFiles,
    } = PhotosUpload;

    PhotosUpload.input = event.target;

    if (hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = getContainer(image);

        preview.appendChild(container);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = getAllFiles();
  },
  getContainer(image) {
    const { getRemoveButton, removePhoto } = PhotosUpload;

    const container = document.createElement("div");
    container.classList.add("photo");
    container.onclick = removePhoto;

    container.appendChild(image);
    container.appendChild(getRemoveButton());

    return container;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.legth > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos.`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];

    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos.");
      event.preventDefault();
      return true;
    }

    return false;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },
  removePhoto(event) {
    const { preview, files, getAllFiles } = PhotosUpload;

    const photoDiv = event.target.parentNode; // div.photo
    const photoArray = Array.from(preview.children);

    const index = photoArray.indexOf(photoDiv);

    files.splice(index, 1);
    PhotosUpload.input.files = getAllFiles();

    photoDiv.remove();
  },
  getAllFiles() {
    const { files } = PhotosUpload;

    // ClipboardEvent.clipboardData() para mozilla
    const dataTransfer = new DataTransfer();

    files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }

    photoDiv.remove();
  },
};

// GERAL
const viewLink = document.querySelectorAll(".recipe__link");

for (let i = 0; i < viewLink.length; i++) {
  const link = viewLink[i];
  link.addEventListener("click", () => {
    window.location.href = `/admin/recipes/${i}`;
  });
}

const ingredients = document.querySelector(".ingredients ul");
const preparation = document.querySelector(".preparation ul");
const information = document.querySelector(".information p");

const ing_hidden = document.querySelector("#ing_hidden");
const pre_hidden = document.querySelector("#pre_hidden");
const info_hidden = document.querySelector("#info_hidden");

const AR_D = "arrow_drop_down";
const AR_U = "arrow_drop_up";

function handleArrow(element, item) {
  element.classList.toggle("hidden");

  if (item.innerHTML === AR_D) {
    item.innerHTML = AR_U;
  } else {
    item.innerHTML = AR_D;
  }
}

if (ingredients !== null && ing_hidden !== null) {
  ing_hidden.addEventListener("click", () => {
    handleArrow(ingredients, ing_hidden);
  });
}

if (preparation !== null && pre_hidden !== null) {
  pre_hidden.addEventListener("click", () => {
    handleArrow(preparation, pre_hidden);
  });
}

if (information !== null && info_hidden !== null) {
  info_hidden.addEventListener("click", () => {
    handleArrow(information, info_hidden);
  });
}
