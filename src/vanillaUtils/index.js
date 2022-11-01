((root, factory) => {
    if (typeof define === "function" && define.amd) {
        define("templateUtils", [], factory);
    } else {
        root.templateUtils = factory();
    }
})(typeof self !== "undefined" ? self : this, () => {
    let pricePrefix = "$";
    let SWATCH_MAPPER = {};

    const checkUrl = function(str) {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    const scrollToTop = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const getMappedFields = function() {
        let fields = Object.values(window.UNBXD_MAPPED_FIELDS);
        let nonNullFields = fields.filter(function (item) {
            return item;
        });
        return nonNullFields || {};
    };

    const getVariantsWithFields = function() {
        let fields = Object.values(window.UNBXD_VARIANTS_CONFIG.mapping);
        let nonNullFields = fields.filter(function (item) {
            return item;
        });
        window.UNBXD_VARIANTS_CONFIG.attributes = nonNullFields;
        return window.UNBXD_VARIANTS_CONFIG;
    };

    const getAutosuggestFields = function () {
        let fields = [window.UNBXD_MAPPED_FIELDS.price, window.UNBXD_MAPPED_FIELDS.title, window.UNBXD_MAPPED_FIELDS.imageUrl];
        let validatedFields = fields.filter(function (item) {
            return item;
        });
        return validatedFields;
    };
    
    const createRangeValues = function(prefix,x,y) {
        const start = `${prefix}${x}`;
        const end= `${prefix}${y}`;
        return  `<span class="UNX-value-left">${start}</span><span class="UNX-value-right">${end}</span>`
    };

    const processSizeVariants = function(products, variants = [], selectedSwatch) {
        const variantsMap = {
            activeSizes:[],
            allSizes:[],
            allProducts:[]
        };
        if(!selectedSwatch) {
            variants.forEach(function(item){
                const {
                    size,
                    vSwatch
                } = item;
                variantsMap.activeSizes.push(size);
                variantsMap.allProducts.push(item);
            });
        } else {
            variants.forEach(function(item){
                const {
                    size,
                    vSwatch
                } = item;
                if(vSwatch === selectedSwatch) {
                    variantsMap.activeSizes.push(size)
                }
                if(variantsMap.allSizes.indexOf(size) < 0) {
                    variantsMap.allProducts.push(item);
                    variantsMap.allSizes.push(item.size);
                }
            });
        }
        return variantsMap;
    };

    const getSortOptions = function() {
        let sortOptions = [];
        const priceField = typeof (window.UNBXD_MAPPED_FIELDS) === "object" ? window.UNBXD_MAPPED_FIELDS["price"] : "";
        if (typeof (priceField) !== "undefined" && priceField) {
            /* add sort options if price field dimension mapping is provided */
            sortOptions.push({
                value:`${priceField} desc`,
                text:"Price: High to Low"
            }, {
                value:`${priceField} asc`,
                text: "Price: Low to High",
            });
        }

        return sortOptions;
    };

    const favouriteButton = function(uniqueId) {
        return `<input type="checkbox" class="UNX-hidden" id="likeBtn-${uniqueId}"/><label class="UNX-icons UNX-favourite" for="likeBtn-${uniqueId}"></label>`
    };
    
    const renderSizeButtons = function(product, variants = [], uniqueId, vSwatch=undefined) {
        let btnSList = ``;
        const variantsList = processSizeVariants(product,variants,vSwatch);
        btnSList = variantsList.allProducts.map(function(item,i){
            const {
                size,
                vSwatch
            } = item;
            let sizeBtnCss = `UNX-swatch-size `;
            if(variantsList.activeSizes.indexOf(size) < 0) {
                sizeBtnCss += ` UNX-swatch-size-faded `;
            } else {
                if(SWATCH_MAPPER[uniqueId].selectedSize === size) {
                    sizeBtnCss += ` UNX-swatch-size-selected `;
                }
            }
            if(size){
                return`<button data-v-size="${size}" data-v-swatch="${vSwatch}" data-action="sizeClick" data-unique-id="${uniqueId}" data-vid="${i}" class="${sizeBtnCss}">${size}</button>` ;
            } else {
                return ``
            }
        }).join("");
        return btnSList;
    };

    const getBadges = (badges) => {
        let mTop = 10;
        let ui = ``;
        if(badges) {
            if(Array.isArray(badges)) {
                badges.forEach((badge,i) => {
                    if(i>0) {
                        mTop += i*50
                    }
                    ui += `<span style="top:${mTop}px" class="UNX-ribbon">${badge}</span>`
                }) 
            } else {
                ui += `<span style="top:${mTop}px" class="UNX-ribbon">${badges}</span>`
            }
        }
        return ui;
    };

    const getVariantsUi = (product, imagesUI, SWATCH_LIMIT, DEFAULT_IMAGE) => {
        const {
            relevantDocument,
            variants = [],
            uniqueId
        } = product;
        SWATCH_MAPPER[uniqueId] = {
            selectedSwatch:null,
            selectedSize:null
        };

        let vSwatchBtns = `<div class="UNX-swatch-main">`;
        let vSizeBtns =  `<div data-unique-id="${uniqueId}" class="UNX-swatch-main UNX-size-main">`;
        let vImages = ``;
        let swatchMap = [];

        const vL  = variants.length;
        
        if(vL >= 1) {
            vSwatchBtns += `<div class="UNX-swatch-btn-row">`;
            if(relevantDocument === "variant"){
                imagesUI = ``;
            }
            vSizeBtns += `<div id="${uniqueId}_SizeBtnRow" class="UNX-swatch-btn-row UNX-size-row">`;
            let vSizeBtnsUi  = renderSizeButtons(product, variants, uniqueId, variants[0].vSwatch);
            for(let i=0;i<vL;i++) {
                const variant = variants[i];
                const uId = `s_${uniqueId}_${i}_sBtn_img`;
                const sProp =variant.vSwatch;
                let swatchCss = (i !== 0) ? "UNX-hidden" : " ";
                (relevantDocument === "parent") ? swatchCss +=" UNX-hidden "  :swatchCss += " UNX-swatch-selected ";
                const swatchBtnCss = (i === 0) ? " UNX-swatch-selected-btn ":" ";
                let sImg = Array.isArray(variant.imageUrl)?variant.imageUrl[0]:variant.imageUrl;
                sImg = sImg ? (sImg.trim() || DEFAULT_IMAGE) : DEFAULT_IMAGE;
                let swatchAction = (sProp)?"swatchClick":"";
                if(!window.UNBXD_VARIANTS_CONFIG.mapping['imageUrl']) {
                    sImg = DEFAULT_IMAGE;
                    swatchAction = "";
                }
                if(!swatchMap.includes(sProp)) {
                    swatchMap.push(sProp);
                    vImages += `<div id="${uId}" class="UNX-img-wrapper ${swatchCss}"><img class="UNX-img-block" src="${sImg}"/></div>`
                    const imgStyle = checkUrl(sProp) ? `background-image:url(${sProp});` : `background-color:${sProp};`;
                    vSwatchBtns += `<button data-v-swatch="${sProp}" style="${imgStyle}" data-unique-id="${uniqueId}" data-vid="${i}" data-action="${swatchAction}" data-swatch-id="${uId}" class="UNX-swatch-button ${swatchBtnCss}"></button>`;
                }
            }
            
            vSizeBtns += `${vSizeBtnsUi}</div>`;
            let moreBtn = ``;
            if(swatchMap.length >= SWATCH_LIMIT){
                const sl = vL-SWATCH_LIMIT;
                moreBtn = `<button  class="UNX-swatch-more-btn" data-unique-id="${uniqueId}" data-action="swatchShowMore">${sl}</button>`
            }
            vSwatchBtns += `</div><div class="UNX-swatch-more">${moreBtn}</div>`;
        }
        vSwatchBtns += `</div>`;
        vSizeBtns += `<div id="${uniqueId}_sizeMore" class="UNX-more-size-btn"></div></div>`;
        return {
            vSwatchBtns,
            vSizeBtns,
            imagesUI,
            vImages
        }       
    };

    const updateSizeSwatches = function(parent, moreBtnNeeded) {
        const wrapper = parent || window.unbxdSearch.searchResultsWrapper;
        const sizeEls = wrapper.querySelectorAll(".UNX-size-main");
        sizeEls.forEach((sizeEl)=>{
            const totalWidth = sizeEl.offsetWidth-40;
            let additions = 0;
            let moreCount = 0;
            const btsList = sizeEl.querySelectorAll(".UNX-swatch-size");
            const btsListLength = btsList.length;
            const {
                uniqueId
            } = sizeEl.dataset;
            for(let i=0;i<btsListLength;i++) {
                const btn = btsList[i];
                additions += btn.offsetWidth;
                if((additions >= totalWidth) && (i > 0)) {
                    moreCount+=1;
                }
            }
            if(moreBtnNeeded){
                if(moreCount >0 ){
                    sizeEl.querySelector(".UNX-more-size-btn").innerHTML = `<button data-unique-id="${uniqueId}" data-more-count="${moreCount}" data-action="sizeCountClick" class="UNX-size-more-btn">+${moreCount}</button>`;
                }
            }
        })

    };

    const updateMoreSizeButtons = (productElem, toggle) => {
        const sizeRowEl = productElem.querySelector(".UNX-size-row");
        const isOpen = sizeRowEl.classList.contains("UNX-show-size-all");
        const moreBtn = productElem.querySelector(".UNX-size-more-btn");
        if(moreBtn) {
            const {
                moreCount
            } = moreBtn.dataset;
            if(toggle){
                if(!isOpen){
                    sizeRowEl.classList.add("UNX-show-size-all");
                    moreBtn.innerHTML = "-";
                } else {
                    sizeRowEl.classList.remove("UNX-show-size-all");
                    moreBtn.innerHTML = `+${moreCount}`;
                }
            }
            moreBtn.setAttribute("data-more-count",moreCount)

        }
    };

    const renderSizeOptions = function(product,variants = [],uniqueId,vSwatch) {
        let btnSList = ``;
        const variantsList =templateUtils.processSizeVariants(product,variants,vSwatch);
        btnSList = variantsList.allProducts.map(function(item,i){
            const {
                size,
                vSwatch
            } = item;
            let sizeBtnCss = `UNX-swatch-size`;
            let extraAttr = ``;
            if(variantsList.activeSizes.indexOf(size) < 0) {
                sizeBtnCss += ` UNX-swatch-size-faded `;
                extraAttr = ` disabled `;
            } else {
                if(SWATCH_MAPPER[uniqueId].selectedSize === size) {
                    sizeBtnCss += ` UNX-swatch-size-selected `;
                    extraAttr += ` selected `
                }
            }
            if(size){
                return`<option value="${size}" data-v-size="${size}" ${extraAttr} data-v-swatch="${vSwatch}" data-action="sizeClick" data-unique-id="${uniqueId}" data-vid="${i}" class="${sizeBtnCss}">${size}</option>` ;
            } else {
                return ``
            }
        }).join("");
        return btnSList;
    };

    const getSelectVariantsUi = (product, imagesUI, SWATCH_LIMIT, DEFAULT_IMAGE) => {
        const {
            relevantDocument,
            variants = [],
            uniqueId
        } = product;
        SWATCH_MAPPER[uniqueId] = {
            selectedSwatch:null,
            selectedSize:null,
            selectChoiceElement:null
        };

        let vSwatchBtns = `<div class="UNX-swatch-main">`;
        let vSizeBtns =  `<div data-unique-id="${uniqueId}" class="UNX-swatch-main UNX-size-main">`;
        let vImages = ``;
        let swatchMap = [];

        const vL  = variants.length;
        let sizeOptionsUI = ``;

        if(relevantDocument === "variant"){
            imagesUI = ``;
        }
        if(vL > 0) {
            sizeOptionsUI  = renderSizeOptions(product,variants,uniqueId,variants[0].vSwatch);
            SWATCH_MAPPER[uniqueId].selectedSwatch = variants[0].vSwatch;
            for(let i=0;i<vL;i++) {
                const variant = variants[i];
                const uId = `s_${uniqueId}_${i}_sBtn_img`;
                const sProp =variant.vSwatch;
                let swatchCss = (i !== 0) ? "UNX-hidden" : " ";
                (relevantDocument === "parent") ? swatchCss +=" UNX-hidden "  :swatchCss += " UNX-swatch-selected ";
                const swatchBtnCss = (i === 0) ? " UNX-swatch-selected-btn ":" ";
                let sImg = Array.isArray(variant.imageUrl)?variant.imageUrl[0]:variant.imageUrl;
                sImg = sImg ? (sImg.trim() || DEFAULT_IMAGE) : DEFAULT_IMAGE;
                let swatchAction = (sProp)?"swatchClick":"";
                if(!window.UNBXD_VARIANTS_CONFIG.mapping['imageUrl']) {
                    sImg = DEFAULT_IMAGE;
                    swatchAction = "";
                }
                if(!swatchMap.includes(sProp)) {
                    swatchMap.push(sProp);
                    vImages += `<div id="${uId}" class="UNX-img-wrapper ${swatchCss}"><img class="UNX-img-block" src="${sImg}"/></div>`
                    const imgStyle = checkUrl(sProp) ? `background-image:url(${sProp});` : `background-color:${sProp};`;
                    vSwatchBtns += `<button data-v-swatch="${sProp}" style="${imgStyle}" data-unique-id="${uniqueId}" data-vid="${i}" data-action="${swatchAction}" data-swatch-id="${uId}" class="UNX-swatch-button ${swatchBtnCss}"></button>`;
                }
                
            }
            if(sizeOptionsUI.length > 2) {
                vSizeBtns = `<div class="UNX-size-select-wrap">
                    <select data-v-swatch="${variants[0].vSwatch}" data-parent="${uniqueId}" class="UNX-select-size">
                        ${sizeOptionsUI}
                    </select>
                </div>`;
            }
            let moreBtn = ``;
            if(swatchMap.length >= SWATCH_LIMIT){
                const sl = vL-SWATCH_LIMIT;
                moreBtn = `<button  class="UNX-swatch-more-btn" data-unique-id="pid_${uniqueId}" data-action="swatchShowMore">${sl}</button>`
            }
            vSwatchBtns += `<div class="UNX-swatch-more">${moreBtn}</div>`

        }
        vSwatchBtns +=`</div>`;
        vSizeBtns += `</div>`;
        return {
            vSwatchBtns,
            vSizeBtns,
            imagesUI,
            vImages
        }
    };

    const onProductClick = function(product, e) {
        const {
            swatchId,
            action,
            uniqueId,
            vid,
            vSwatch,
            vSize
        } = e.target.dataset;
        const {
            variants
        } = product;
        const variant = variants ? variants[vid] : {};
        let productElem = null;
        if(uniqueId) {
            productElem = document.querySelector(`#pid_${uniqueId}`)
        }
        if (action === "swatchClick" && productElem) {
            const currentId = productElem.querySelector(`.UNX-swatch-selected`);
            if(currentId){
                currentId.classList.remove("UNX-swatch-selected");
                currentId.classList.add("UNX-hidden");
            }
                
            const selectedBtn = productElem.querySelector(`.UNX-swatch-selected-btn`);
            if(selectedBtn) {
                selectedBtn.classList.remove("UNX-swatch-selected-btn");
            }

            e.target.classList.add("UNX-swatch-selected-btn");
            var newImg = document.getElementById(swatchId);

            const parentImage = productElem.querySelector(`.UNX-parent-image`);
            if(parentImage && !parentImage.classList.contains("UNX-hidden")) {
                parentImage.classList.add("UNX-hidden")
            }
            newImg.classList.add("UNX-swatch-selected");
            newImg.classList.remove("UNX-hidden");

            const {
                price
            } = variant;
            const priceField =  document.querySelector(`#pid_${uniqueId} .UNX-sale-price`);
            if(price && priceField) {
                priceField.innerHTML = `${pricePrefix}${price}`;
            }
            if(SWATCH_MAPPER[uniqueId].selectChoiceElement){
                const btnContainer = productElem.querySelector(".UNX-size-select-wrap");
                const sizeBtns = renderSizeOptions(product, variants, uniqueId, vSwatch);
                SWATCH_MAPPER[uniqueId].selectChoiceElement = SWATCH_MAPPER[uniqueId].selectChoiceElement.destroy();
                btnContainer.innerHTML = `<select data-v-swatch="${vSwatch}"  data-parent="${uniqueId}"   class="UNX-select-size" >${sizeBtns}</select>`;
                SWATCH_MAPPER[uniqueId].selectedSwatch = vSwatch;
                SWATCH_MAPPER[uniqueId].selectChoiceElement = new window.Choices(btnContainer.querySelector(".UNX-select-size"),{
                    searchEnabled:false,
                    position:"bottom"
                })
            } else {
                const btnContainer = productElem.querySelector(".UNX-size-row");
                if(btnContainer) {
                    const sizeBtns = renderSizeButtons(product, variants, uniqueId, vSwatch);
                    btnContainer.innerHTML = sizeBtns;
                    SWATCH_MAPPER[uniqueId].selectedSwatch = vSwatch;
                    updateSizeSwatches(productElem, false);
                    updateMoreSizeButtons(productElem, false);
                }

            }
        }
        if(action === "swatchShowMore") {
            document.querySelector(`#${uniqueId} .UNX-swatch-btn-row`).classList.add("UNX-show-more-swatches");
        }
        if(action === "sizeClick" && productElem) {
            const selectedSizeBtn = productElem.querySelector(".UNX-swatch-size-selected");
            if(selectedSizeBtn) {
                selectedSizeBtn.classList.remove("UNX-swatch-size-selected")
            }
            SWATCH_MAPPER[uniqueId].selectedSize = vSize;
            e.target.classList.add("UNX-swatch-size-selected");
        }
        if(action === "sizeCountClick") {
           updateMoreSizeButtons(productElem, true);
        }
        
        if (action === "addToCart") {
            alert(product.title + " - Successfully added to cart")
        }

    };

    const getDisplayPriceRow = function(price, sellingPrice, prefix = "$") {
        let displayPrice = sellingPrice || price;
        let priceUI = displayPrice ? `<span class="UNX-sale-price">${prefix}${displayPrice}</span>` : ``;
        let strikeUI = (price && sellingPrice  && (price !== sellingPrice)) ? `<span class="UNX-strike-price">${prefix}${price}</span>` : ``;
        let priceRowUI = `<div>${priceUI}${strikeUI}</div>`;
        return priceRowUI;
    };

    const getRangeTemplate = function(range, selectedRange, facet) {
        const {
            facetName,
            start,
            end,
            gap
        } = range;
        let min = start;
        let max = end;
        const {
            rangeWidgetConfig
        } = facet;
        const {
            prefix
        } = rangeWidgetConfig;
        if (selectedRange.length > 0) {
            const sel = selectedRange[0].replace(/[^\w\s]/gi, '').split(" TO ");
            min = sel[0];
            max = sel[1];
        } else {
            max += gap
        }
        const rangId = `${facetName}_slider`;
        return [`<div id="${facetName}"  data-id="${facetName}" class=" UNX-range-slider-wrap">`,
            `<div id="${rangId}_value"class="UNX-value-container UNX-range-value-block">${templateUtils.createRangeValues(prefix, min, max)}</div>`,
            `<div id="${rangId}" data-x="${min}" data-y="${max}" class="UNX-range-slider-wrapper"></div>`,
            `</div>`,
            `<div>`,
            `</div>`
        ].join('')
    };

    const onFacetLoad = function(facets) {
        const self = this;
        const {
            facet
        } = this.options;
        const {
            rangeWidgetConfig
        } = facet;
        facets.forEach(facetItem => {
            const {
                facetType,
                facetName,
            } = facetItem;
            const {
                prefix
            } = rangeWidgetConfig;

            if (facetType === "range") {
                const rangeId = `${facetName}_slider`;
                const sliderElem = document.getElementById(rangeId);
                const valueEl = document.getElementById(`${rangeId}_value`);
                let {
                    end,
                    gap,
                    max,
                    start
                } = facetItem;
                const selectedValues = sliderElem.dataset;
                if (selectedValues) {
                    start = Number(selectedValues.x),
                        end = Number(selectedValues.y)
                }
                this[rangeId] = window.noUiSlider.create(sliderElem, {
                    start: [start, end],
                    connect: true,
                    range: {
                        'min': 0,
                        'max': max
                    },
                    format: {
                        to: function(value) {
                            return Math.round(value);
                        },
                        from: function(value) {
                            return Math.round(value);
                        }
                    },
                    padding: 0,
                    margin: 0,
                    direction : window.LANGUAGE === "ar" ? 'rtl':'ltr'
                });
                this[rangeId].on("set", function(data) {
                    const newData = {
                        start: data[0],
                        end: data[1],
                        facetName,
                        gap
                    };
                    self.setRangeSlider(newData);
                });
                this[rangeId].on('slide', function (data) {
                    valueEl.innerHTML = createRangeValues(prefix, data[0], data[1])
                });
            }
        });
    };

    const productViewTemplate = function(selectedViewType, productViewType) {
        const isDisabled = (this.getSearchResults())?false:true;
        const {
            selectedViewTypeClass,
            viewTypeClass
        } = productViewType;
        const {
            UNX_gridBtn,
            UNX_listBtn
        } = this.testIds;
        let listBtnCss =`UNX-list-btn ${viewTypeClass} `;
        let gridBtnCss = `UNX-grid-btn ${viewTypeClass}`;
        const gTAttr = `data-test-id=${UNX_gridBtn}`;
        const lTAttr = `data-test-id=${UNX_listBtn}`;
        if(selectedViewType === 'LIST' ) {
            listBtnCss += ` ${selectedViewTypeClass}`
        }
        if(selectedViewType === 'GRID' ) {
            gridBtnCss += ` ${selectedViewTypeClass}`
        }
        let listBtn = `<button id="listBtn" class="${listBtnCss}" ${lTAttr} data-view-action="LIST" ></button>`;
        let gridBtn = `<button ${gTAttr} id="gridBtn" class="${gridBtnCss}" data-view-action="GRID" ></button>`;
        if(isDisabled) {
            listBtn = `<button ${lTAttr} id="listBtn" disabled class="${listBtnCss} disabled-btn" data-view-action="LIST" ></button>`;
            gridBtn = `<button ${gTAttr} id="gridBtn" disabled class="${gridBtnCss}  disabled-btn"data-view-action="GRID" ></button>`;
        }
        return `<div class='product-view-container'>${gridBtn} ${listBtn}</div>`;
    };

    const sortTemplate = function(selectedSort, sortConfig) {
        let optionsUI = "";
        const {
            options,
            sortClass,
            selectedSortClass
        } = sortConfig;
        const {
            UNX_unbxdSorter
        } = this.testIds;
        options.forEach((item) => {
            const {
                value,
                text
            } = item;
            if(value == selectedSort) {
                optionsUI += `<button data-test-id="${UNX_unbxdSorter}"  data-action="clearSort"  value="${value}" class="${sortClass} ${selectedSortClass}" data-selected>${text}</button>`;
            } else {
                optionsUI += `<button data-test-id="${UNX_unbxdSorter}" class="${sortClass}"  data-action="changeSort"  value="${value}">${text}</button>`;
            }
        })
        let relevanceSelected = ""; 
        if(!selectedSort) {
            relevanceSelected = selectedSortClass;
        }
        const rlvnceUi = `<button data-test-id="${UNX_unbxdSorter}" class="${sortClass} ${relevanceSelected}"  data-action="changeSort"   value="">Relevancy</button>`;
        return [`<div class="UNX-sort-block">`,
            `<span class="UNX-sort-header">Sort By</span>`,
            `<div id="unbxdSorter" class="UNX-sort-wrapper">`,
            rlvnceUi,
                optionsUI,
            `</div>`,
        `</div>`].join('');
    };

    const getPricePrefix = function(){
        return pricePrefix
    };

    const getRating = function(rating) {
        return rating ? `<span class="UNX-review-badge"> ${rating} <span class="UNX-star">★</span></span>` : ``;
    };

    const spellCheckTemplate = function(query,suggestion,pages) {
        const {
            start,
            productsLn,
            numberOfProducts
        } = pages;
        const {
            selectorClass
        } = this.options.spellCheck;
        const {
            productType
        } = this.options;
        let newQuery = query;
        if(productType !=="SEARCH" ) {
            const catId = this.getCategoryId() || "";
            const cId = decodeURIComponent(catId).split(">");
            newQuery = cId[cId.length-1] || cId[0] ;
        }
        const {
            UNX_spellCheck
        } = this.testIds

        const noUi = (suggestion) ? `<p class="UNX-no-result"> Your search "<strong>${suggestion}</strong>" did not match any products. Did you mean <button data-test-id="${UNX_spellCheck}" data-action="getSuggestion" class="${selectorClass}">${query}</button>? </p>` :``;
        let qUi = ``;
        let countUi = ``;
        if(numberOfProducts > 0) {
            countUi = `<span class="UNX-result-info">  -  ${start+1} to ${productsLn+start} of ${numberOfProducts} products</span>`;
            if(window.LANGUAGE === "ar") {
                countUi =  `<span class="UNX-result-info">  - ${start+1} - ${productsLn+start} من ${numberOfProducts} منتجات </span>`;
            }
        }
        if(pages && newQuery){
            qUi = `<p class="UNX-suggestion-p">Showing results for <strong>${newQuery}</strong> ${countUi}</p>`;
            if(window.LANGUAGE === "ar")  {
                qUi = `<p class="UNX-suggestion-p">عرض النتائج ل <strong>${newQuery}</strong> ${countUi}</p>`;
            }
        }
        return  [`<div class="UNX-spellcheck-block">`,
                noUi,
                qUi,
            `</div>`].join('');
    };

    const selectedFacetItemTemplateUI = function selectedFacetItemTemplateUI (selectedFacet,selectedFacetItem,facetConfig,selectedFacetsConfig){
        const {
            facetName,
            facetType
        } = selectedFacet;
        let  {
            name
        } = selectedFacetItem;
        const  {
            count,
            dataId
        } = selectedFacetItem;
        const {
            facetClass,
            selectedFacetClass,
            removeFacetsSelectorClass
        } = this.options.facet;
        const {
            UNX_uFilter
        } = this.testIds;
        let action = "deleteSelectedFacetValue"
        if(facetType === "range") {
            action = "deleteSelectedRange";
            const nameTxt = name.split("TO");
            name = `${nameTxt[0]} <span>TO</span> ${nameTxt[1]}`;
        }
        const css = ` ${facetClass} ${selectedFacetClass} `;
        return [`<div class="UNX-selected-facets-wrap">`,
                    `<button data-test-id="${UNX_uFilter}" class="UNX-selected-facet-btn UNX-change-facet ${css}" data-facet-name="${facetName}" data-facet-action="${action}" data-id="${dataId}">`,
                        `<span class="UNX-facet-text">${decodeURIComponent(name)}</span> <span class="UNX-facet-count">(${count})</span>`,
                    `</button>`,
                    `<button class="UNX-delete-facet ${removeFacetsSelectorClass} ${css}" data-id="${dataId}" data-facet-action="${action}" data-facet-name="${facetName}">x</button></div>`
                ].join('');
    };

    const getSwatchMapper = function () {
        return SWATCH_MAPPER;
    };

    return {
        checkUrl,
        scrollToTop,
        getMappedFields,
        getVariantsWithFields,
        getAutosuggestFields,
        createRangeValues,
        processSizeVariants,
        getSortOptions,
        favouriteButton,
        getBadges,
        getVariantsUi,
        renderSizeButtons,
        updateSizeSwatches,
        updateMoreSizeButtons,
        getSelectVariantsUi,
        renderSizeOptions,
        onProductClick,
        getDisplayPriceRow,
        getRangeTemplate,
        onFacetLoad,
        productViewTemplate,
        sortTemplate,
        getPricePrefix,
        getRating,
        spellCheckTemplate,
        selectedFacetItemTemplateUI,
        getSwatchMapper
    };
});
