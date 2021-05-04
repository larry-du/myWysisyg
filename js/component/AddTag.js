const content = document.querySelector("#content");

function addTitleTag({titleTag,createSubButton}) {
	content.insertAdjacentHTML('beforeend', titleTag);
	const [...titles] = document.querySelectorAll(".title");
	const lastData = titles[titles.length-1];
	lastData.addEventListener("click", (event) => {
			addToolbar(event.target,createSubButton);
		});
}

function addTextTag({ textType, textTag,createSubButton}) {
	content.insertAdjacentHTML('beforeend', textTag);
	const [...texts] = document.querySelectorAll(`.${textType}-text`);
	const lastData = texts[texts.length-1];
		lastData.addEventListener("click", (event) => {
			addToolbar(event.target,createSubButton);
		});
}

function addListTag({listTitle,createSubButton}) {
	content.insertAdjacentHTML('beforeend', listTitle);
	const [...listTitles] = document.querySelectorAll(".listTitle");
	const lastData = listTitles[listTitles.length-1];

	lastData.addEventListener("click", (event) => {
		const isTitle = event.target.classList.contains("listTitle");
		const isItem = event.target.classList.contains("listItem");
		if (isTitle) {
			addToolbar(event.target,createSubButton);
		}
		if (isItem) {
			addToolbar(event.target,createSubButton);
		}
	})
}

function addTableTag({ row, col }, { createTableArea,createTbody,createTr,createTd },createSubButton) {
	content.insertAdjacentHTML('beforeend', createTableArea());
	document.documentElement.style.setProperty('--tableWidth', `${100/col}%`);

	const totalRow = Array(Number(row)).fill(0);
	const totalCol = Array(Number(col)).fill(0);

	const [...tableForms] = document.querySelectorAll(".tableForm");
	const lastData = tableForms[tableForms.length - 1];
	lastData.insertAdjacentHTML('beforeend', createTbody());
	const tbody = lastData.querySelector(".tbody");

	totalRow.forEach((rowData, rowIndex) => {
		tbody.insertAdjacentHTML('beforeend', createTr(rowIndex));
		const rowItem = tbody.querySelector(`.rowItem-${rowIndex + 1}`);
		totalCol.forEach(() => {
			rowItem.insertAdjacentHTML('beforeend', createTd());
		})
	})

	const [...tdLists] = document.querySelectorAll(".tdList");
	tdLists.forEach(tdList=>{
		tdList.addEventListener("click",(event)=>{
			addToolbar(event.target,createSubButton);
		})
	})
}

function addLastPositionImg(createImgUpload,createImage){
	content.insertAdjacentHTML('beforeend', createImgUpload());
	const imgUpload = document.querySelector(".imgUpload");
	imgUpload.addEventListener("change",(event)=>{
		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.addEventListener('load',(dataEvent)=>{
				const uploadArea = content.querySelector(".uploadArea");
				content.insertAdjacentHTML('beforeend',createImage(dataEvent.target.result));
				uploadArea.remove();
		})
  })
}

function addRandomImg(currentFocus,createImgUpload,createImage){
	console.log(currentFocus);
  const currentParent = currentFocus.parentNode
	if(currentParent.localName==="button") return alert("點擊編輯區")
	if(currentParent.localName ==="tr"){
		currentFocus.insertAdjacentHTML('beforeend',createImgUpload())
	}else{
		currentParent.insertAdjacentHTML('beforeend',createImgUpload())
	}
  const imgUpload = document.querySelector(".imgUpload")
  imgUpload.addEventListener("change",(e)=>{
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load',(event)=>{
			const uploadArea = content.querySelector(".uploadArea");
			if(currentParent.localName==="tr"){
				currentFocus.insertAdjacentHTML('beforeend',createImage(event.target.result))
			}else{
				currentParent.insertAdjacentHTML('beforeend',createImage(event.target.result))
			}
      // currentParent.insertAdjacentHTML('beforeend',createImage(event.target.result))
			uploadArea.remove();
    })
  })
}


function addCardGroup(createCard,createCardImg,createSubButton){
	content.insertAdjacentHTML('beforeend', createCard());
	const imgUpload = document.querySelector(".imgUpload");
	const [...cardBodys] = document.querySelectorAll(".cardBody");
	const lastData = cardBodys[cardBodys.length-1];
	imgUpload.addEventListener("change",(event)=>{
		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.addEventListener('load',(dataEvent)=>{
				const uploadArea = content.querySelector(".uploadArea");
				const cardImg = content.querySelector(".cardImg");
				cardImg.insertAdjacentHTML('afterbegin',createCardImg(dataEvent.target.result));
				uploadArea.remove();
		})
  })

	lastData.addEventListener("click", (event) => {
		const isCardTitle = event.target.classList.contains("cardTitle");
		const isCardItem = event.target.classList.contains("cardText");
		if (isCardTitle) {
			addToolbar(event.target,createSubButton);
		}
		if (isCardItem) {
			addToolbar(event.target,createSubButton);
		}
	})

}

function addToolbar(currentDom,createSubButton){
  const isCollapse = window.getSelection().isCollapsed;
	const checkSubButtonArea =document.querySelector(".subButtonArea");
	const isShowLinkButton = currentDom.classList.contains("showLink");
	const isShowBoldButton = currentDom.classList.contains("showBold");
	const isShowHightLightButton = currentDom.classList.contains("showHightLight");
	// const isShowNormalButton = currentDom.classList.contains("showNormal");
	if (isCollapse||checkSubButtonArea||isShowLinkButton||isShowBoldButton||isShowHightLightButton) return

	const selectedString = window.getSelection().toString();
	const isEmpty = /\s/.test(`${selectedString}`);
	if (isEmpty) return

	currentDom.insertAdjacentHTML('beforeend',createSubButton());
	const [...subButtonAreas] = document.querySelectorAll(".subButtonArea");
	const lastData = subButtonAreas[subButtonAreas.length-1];
	lastData.addEventListener("click",(event)=>{
		bindingToolBar(event,currentDom,selectedString);
	})
}

function bindingToolBar(event,currentDom,selectedString){
	const currentButton = event.target
	const isLink = event.target.classList.contains("showLink");
	const isBold = event.target.classList.contains("showBold");
	const isHightLight = event.target.classList.contains("showHightLight");
	// const isNormal = event.target.classList.contains("showNormal");
	if(isLink){
		currentButton.addEventListener("click",addLinkAddress(currentDom,currentButton,selectedString));
	}
	if(isBold){
		currentButton.addEventListener("click", addBold(currentDom,selectedString));
	}
	if(isHightLight){
		currentButton.addEventListener("click", addHightLight(currentDom,selectedString));
	}
	// if(isNormal){
	// 	currentButton.addEventListener("click", addNormal(currentDom,selectedString));
	// }
}
// function addNormal(currentDom,selectedString){
// 	currentDom.innerHTML = currentDom.innerHTML.replace(
// 		`<span class="targetText">${selectedString}</span>`,
// 		`${selectedString}`
// 	);
// 	currentDom.querySelector(".subButtonArea").remove();
// }

function addHightLight(currentDom,selectedString){
	const checkTargetText = currentDom.querySelector(".targetText");

	if(checkTargetText) {
		const getHightLight = checkTargetText.classList.contains("hightLight");
		getHightLight? currentDom.querySelector(".subButtonArea").remove() : checkTargetText.classList.add("hightLight");
		return currentDom.querySelector(".subButtonArea").remove();
	}
	currentDom.innerHTML = currentDom.innerHTML.replace(
		`${selectedString}`,
		`<span class="targetText">${selectedString}</span>`
	);
	const targetText = currentDom.querySelector(".targetText");
	targetText.classList.add("hightLight");
	currentDom.querySelector(".subButtonArea").remove();
}

function addBold(currentDom,selectedString){
	const checkTargetText = currentDom.querySelector(".targetText");

	if(checkTargetText) {
		const getBold = checkTargetText.classList.contains("bold")
		getBold? currentDom.querySelector(".subButtonArea").remove() : checkTargetText.classList.add("bold");
		return currentDom.querySelector(".subButtonArea").remove();
	}
	currentDom.innerHTML = currentDom.innerHTML.replace(
		`${selectedString}`,
		`<span class="targetText">${selectedString}</span>`
	);
	const targetText = currentDom.querySelector(".targetText");
	targetText.classList.add("bold");
	currentDom.querySelector(".subButtonArea").remove();
}

function addLinkAddress(currentDom,currentButton,selectedString){
	const subButtonArea = currentButton.parentNode;
	subButtonArea.insertAdjacentHTML('beforeend',`<input class="typeAddress">`);
	const typeAddress = subButtonArea.querySelector(".typeAddress");
	typeAddress.addEventListener("change",(typeAddressEvent)=>{
		const webAddress = typeAddressEvent.target.value;
		typeAddress.addEventListener("keyup",(keyEvent)=>{
			if (keyEvent.key === "Enter"){
				currentDom.innerHTML = currentDom.innerHTML.replace(
					`${selectedString}`,
					`<a href="${webAddress}">${selectedString}</a>`
				);
				currentDom.querySelector(".subButtonArea").remove();
			}
		})
	})
}

function addIframeTag(linkAddress,createIframe){
	content.insertAdjacentHTML('beforeend', createIframe(linkAddress));
}

content.addEventListener("click", (event) => {
	const isClose = event.target.classList.contains("close");
	if (isClose) event.target.parentNode.remove();
})

export { 
	addTextTag, 
	addTitleTag, 
	addListTag, 
	addTableTag,
	addIframeTag,
  addRandomImg,
	addLastPositionImg,
	addCardGroup 
}