    var pictureCount = 2;
    let dragItem;
    let dragItems;
    let selectedSticker= { active: false };
    let selectedStickerIndex = 0;
    var container = document.querySelector("#container");
    var stickers = [];

    function setupDragItems(){
        dragItems = document.querySelectorAll(".item");
        for (var i = 0; i < dragItems.length; i++){
            var item = dragItems[i];
            item.id=i;
        }
    }
    
    function setupStickers() {
      var stickerId = stickers.length;
      sticker = {
        active: false,
        id: stickerId,
        coordinates: {
          currentX: null,
          currentY: null,
          initialX: null,
          initialY: null,
          xOffset: 0,
          yOffset: 0
        }
        }
        stickers[stickerId] = sticker 
        setupDragItems(); 
    }
    
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      for(var value of dragItems.values()) { 
      if (e.target === value) {
      for(var j in stickers){
      if(stickers[j].id == value.id){
      selectedSticker = stickers[j];
      selectedStickerIndex = j;    
      if (e.type === "touchstart") {
        selectedSticker.coordinates.initialX = e.touches[0].clientX - selectedSticker.coordinates.xOffset;
        selectedSticker.coordinates.initialY = e.touches[0].clientY - selectedSticker.coordinates.yOffset;
      } else {
        selectedSticker.coordinates.initialX = e.clientX - selectedSticker.coordinates.xOffset;
        selectedSticker.coordinates.initialY = e.clientY - selectedSticker.coordinates.yOffset;
      }
      selectedSticker.active = true;
        dragItem = e.target;
        }
      }
        }
      }
    }

    function dragEnd(e) {
      if (selectedSticker.active){
        selectedSticker.coordinates.initialX = selectedSticker.coordinates.currentX;
        selectedSticker.coordinates.initialY = selectedSticker.coordinates.currentY;
        selectedSticker.active = false;
        stickers.splice(selectedStickerIndex, 1, selectedSticker);
    }
    }

    function drag(e) {
      if (selectedSticker.active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          selectedSticker.coordinates.currentX = e.touches[0].clientX - selectedSticker.coordinates.initialX;
          selectedSticker.coordinates.currentY = e.touches[0].clientY - selectedSticker.coordinates.initialY;
        } else {
          selectedSticker.coordinates.currentX = e.clientX - selectedSticker.coordinates.initialX;
          selectedSticker.coordinates.currentY = e.clientY - selectedSticker.coordinates.initialY;
        }

        selectedSticker.coordinates.xOffset = selectedSticker.coordinates.currentX;
        selectedSticker.coordinates.yOffset = selectedSticker.coordinates.currentY;

        setTranslate(selectedSticker.coordinates.currentX, selectedSticker.coordinates.currentY, dragItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var pageContents = "<!DOCTYPE html><html><head><link rel=\"stylesheet\" href=\"index.css\"><title>Drag/Drop/Bounce</title></head><body>"+printContents+"</body></html>"
    var calendarWindow = window.open();
    calendarWindow.document.write(pageContents); 
    setTimeout(function(){
        calendarWindow.print();
        calendarWindow.close();
    }, 500);     
   }

   function addSticker(stickerPath){
       var stickerContainer = document.querySelector("#stickerContainer");
       stickerContainer.innerHTML+="<div class='item'><img src='"+stickerPath+"'/></div>";
       setupStickers();
   }

   function loadPictures(){
    var scrollcontainer = document.querySelector(".scrollcontainer");
       for (var i=0; i < pictureCount; i++) {
           scrollcontainer.innerHTML+="<div onclick=\"addSticker('images/"+i+".png');\"><img src='images/"+i+".png'/></div>"
       }
   }

const scrollcontainer = document.querySelector(".scrollcontainer");
const lefty = document.querySelector(".lefty");
let translate = 0;

lefty.addEventListener("click", function() {
  	translate += 200;
  	scrollcontainer.style.transform = "translateX(" + translate + "px" + ")";
});

const righty = document.querySelector(".righty");
righty.addEventListener("click", function() {
  	translate -= 200;
  	scrollcontainer.style.transform = "translateX(" + translate + "px" + ")";
});

loadPictures();