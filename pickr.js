document.addEventListener("DOMContentLoaded", function () {
  // Get all color picker containers with the class "color-picker-container"
  const colorPickerContainers = document.querySelectorAll(".color-picker-container");

  // Create a Pickr instance for each color picker container
  colorPickerContainers.forEach((container) => {
    const pickr = Pickr.create({
      el: container.querySelector(".pickr-container"),
      theme: "classic",
      default: "#ffffff",
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          save: true,
        },
      },
    });

    // Add event listener to the color preview element
    const colorPreview = container.querySelector(".color-preview");
    colorPreview.addEventListener("click", () => {
      const colorPreviewBg = container.querySelector(".color-preview-bg");
      pickr.setColor(colorPreviewBg.style.backgroundColor);
      pickr.show();
    });

    // Add event listener to update the color preview background element
    pickr.on("change", (color) => {
      const colorPreviewBg = container.querySelector(".color-preview-bg");
      colorPreviewBg.style.backgroundColor = color.toHEXA().toString();
    });

    // Add event listener to the save button
    pickr.on("save", (color) => {
      const hexInput = container.querySelector(".hex-input");
      hexInput.value = color.toHEXA().toString();
      pickr.hide();
    });

    // Add event listener to update the hex input field
    pickr.on("change", (color) => {
      const hexInput = container.querySelector(".hex-input");
      hexInput.value = color.toHEXA().toString();
    });
  });
});