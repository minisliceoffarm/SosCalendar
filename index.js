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
    var pageContents = "<!DOCTYPE html><html><head><link rel=\"stylesheet\" href=\"print.css\"><title>MiniSliceOfFarm Weekly Menu</title></head><body>"+printContents+"</body></html>";
    var calendarWindow = window.open();
    calendarWindow.document.write(pageContents);
    calendarWindow.document.getElementById('weeklyThemeText').value = document.getElementById('weeklyThemeText').value;
    calendarWindow.document.getElementById('mondayText').value = document.getElementById('mondayText').value;
    calendarWindow.document.getElementById('tuesdayText').value = document.getElementById('tuesdayText').value;
    calendarWindow.document.getElementById('wednesdayText').value = document.getElementById('wednesdayText').value;
    calendarWindow.document.getElementById('thursdayText').value = document.getElementById('thursdayText').value;
    calendarWindow.document.getElementById('fridayText').value = document.getElementById('fridayText').value;
    setTimeout(function(){
        calendarWindow.print();
        calendarWindow.close();
    }, 500);     
   }

   function addSticker(stickerPath){
       var stickerContainer = document.querySelector("#stickerContainer");
       if( stickerContainer.childNodes.length < 9 ){
        stickerContainer.innerHTML+="<div class='item'><img src='"+stickerPath+"'/></div>";
        setupStickers();
       }
   }

   function loadPictures(){
    var scrollcontainer = document.querySelector(".scrollcontainer");
       for (var i=0; i < pictureCount; i++) {
           scrollcontainer.innerHTML+="<div onclick=\"addSticker('images/"+i+".png');\"><img src='images/"+i+".png'/></div>"
       }
   }

    function getWeekdays() {
      var today = new Date();
      var monthNum = today.getMonth();
      var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      var monthText = monthArr[monthNum];
      var mondayDate = new Date();
      switch(today.getDay()){
        case 0:
        mondayDate.setDate(mondayDate.getDate() + 1);
        break;
        case 1:
        mondayDate.setDate(mondayDate.getDate());
        break;
        case 2:
        mondayDate.setDate(mondayDate.getDate() + 6);
        break;
        case 3:
        mondayDate.setDate(mondayDate.getDate() + 5);
        break;
        case 4:
        mondayDate.setDate(mondayDate.getDate() + 4);
        break;
        case 5:
        mondayDate.setDate(mondayDate.getDate() + 3);
        break;
        case 6:
        mondayDate.setDate(mondayDate.getDate() + 2);
        break;
      }
      var tuesdayDate = new Date();
      tuesdayDate.setDate(mondayDate.getDate() + 1);
      var wednesdayDate = new Date();
      wednesdayDate.setDate(mondayDate.getDate() +2);
      var thursdayDate = new Date();
      thursdayDate.setDate(mondayDate.getDate() +3);
      var fridayDate = new Date();
      fridayDate.setDate(mondayDate.getDate() +4);
      var weekDays = {
        monday: {
          dayText: 'Monday',
          dayMonthText: monthArr[mondayDate.getMonth()],
          dayNumber: mondayDate.getDate()
        },
        tuesday: {
          dayText: 'Tuesday',
          dayMonthText: monthArr[tuesdayDate.getMonth()],
          dayNumber: tuesdayDate.getDate()
        },
        wednesday: {
          dayText: 'Wednesday',
          dayMonthText: monthArr[wednesdayDate.getMonth()],
          dayNumber: wednesdayDate.getDate()
        },
        thursday: {
          dayText: 'Thursday',
          dayMonthText: monthArr[thursdayDate.getMonth()],
          dayNumber: thursdayDate.getDate()
        },
        friday: {
          dayText: 'Friday',
          dayMonthText: monthArr[fridayDate.getMonth()],
          dayNumber: fridayDate.getDate()
        }
      }
      return weekDays;
    }

    function setWeekdayText() {
      var weekdays = getWeekdays();
      document.querySelector(".Monday .weekDayDate").innerText = weekdays.monday.dayMonthText + " " + weekdays.monday.dayNumber;
      document.querySelector(".Tuesday .weekDayDate").innerText = weekdays.tuesday.dayMonthText + " " + weekdays.tuesday.dayNumber;
      document.querySelector(".Wednesday .weekDayDate").innerText = weekdays.wednesday.dayMonthText + " " + weekdays.wednesday.dayNumber;
      document.querySelector(".Thursday .weekDayDate").innerText = weekdays.thursday.dayMonthText + " " + weekdays.thursday.dayNumber;
      document.querySelector(".Friday .weekDayDate").innerText = weekdays.friday.dayMonthText + " " + weekdays.friday.dayNumber;

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
setWeekdayText();