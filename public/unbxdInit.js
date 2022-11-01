{
  /* utility functions */
  const IS_VARIANTS_ENABLED =
    typeof window.UNBXD_VARIANTS_CONFIG === "object"
      ? window.UNBXD_VARIANTS_CONFIG.enabled
      : false;

  const DEFAULT_IMAGE =
    "https://libraries.unbxdapi.com/sdk-assets/defaultImage.svg";

  /* No variant template */
  const SWATCH_LIMIT = 0;

  const setUpMobileEvents = function () {
    const btnEls = document.querySelectorAll(".UNX-facet-trigger");
    btnEls.forEach((item) => {
      item.addEventListener("click", toggleMobileFacets);
    });
  };
  //test()

  let showFacet = false;
  const toggleMobileFacets = function (e) {
    const facetBlock = document.querySelector(".UNX-fxd-facet");
    showFacet = !showFacet;
    const { action } = e.target.dataset;
    if (action === "applyFacets") {
      templateUtils.scrollToTop();
      window.unbxdSearch.setPageStart(0);
      window.unbxdSearch.getResults();
    }
    if (action === "clearFacets") {
      templateUtils.scrollToTop();
      window.unbxdSearch.clearAllFacets();
      window.unbxdSearch.setPageStart(0);
      window.unbxdSearch.getResults();
    }
    if (showFacet) {
      facetBlock.classList.add("UNX-show-facets");
    } else {
      facetBlock.classList.remove("UNX-show-facets");
    }
  };

  /* utility functions end */

  const searchInput = document.getElementById("unbxdInput");
  
  window.setUnbxdSearch = function () {
    window.unbxdSearch = new window.UnbxdSearch({
      siteKey: window.UNBXD_SITE_KEY,
      apiKey: window.UNBXD_API_KEY,
      searchEndPoint: `${window.UNBXD_SEARCH_URL}/`,
      searchBoxEl: searchInput,
      searchButtonEl: document.getElementById("searchBtn"),
      searchTrigger: "click",
      allowExternalUrlParams: true,
      products: {
        el: document.getElementById("searchResultsWrapper"),
        productAttributes: templateUtils.getMappedFields(),
        onProductClick: templateUtils.onProductClick,
        attributesMap: window.UNBXD_MAPPED_FIELDS,
        template: function (product, idx, swatchUI, productViewType, products) {
          let { uniqueId, imageUrl, title, price, sellingPrice } = product;
          const { productItemClass } = products;

          let imgUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
          imgUrl = imgUrl ? imgUrl.trim() || DEFAULT_IMAGE : DEFAULT_IMAGE;
          if (!window.UNBXD_MAPPED_FIELDS["imageUrl"]) {
            imgUrl = DEFAULT_IMAGE;
          }

          let imagesUI = `<div class="UNX-img-wrapper  UNX-parent-image"><img class="UNX-img-block" src="${imgUrl}"/></div>`;

          const variantData = templateUtils.getVariantsUi(
            product,
            imagesUI,
            SWATCH_LIMIT,
            DEFAULT_IMAGE
          );
          let vImages = variantData.vImages;
          imagesUI = variantData.imagesUI;
          const priceHtml = templateUtils.getDisplayPriceRow(
            price,
            sellingPrice
          );
          let priceUI = `<div class="UNX-price-row">${priceHtml}</div>`;
          let cardType = ``;
          if (productViewType === "GRID") {
            cardType = "UNX-grid-card";
          } else {
            cardType = "UNX-list-card";
          }
          /** DELETE_STARTS */
          let debuggerUI = window.UNBXD_USER
        
            ? `<span class="UNX-preview-debugger" data-title="${title}" data-unique-id="${uniqueId}"></span>`
            : "";

          let {pins,slots=[]}=window?.unbxdSearch?.state?.responseObj.debug?.metadata;
          let slotarr=[];

          
          for(let i=0;i<slots.length;i++){
            for(let j=slots[i].start;j<=slots[i].end;j++){
               slotarr.push(j)
            }
          }
          
         
          /** DELETE_ENDS */

          return [
            `<div id="pid_${uniqueId}" data-id="${uniqueId}" data-prank="${idx}" data-item="product" class="UNX-product-col ${cardType} ${productItemClass} pd_pid_${uniqueId}">`,
            `<div class="UNX-images-block">`,
              // templateUtils.favouriteButton(uniqueId),
              `${/* DELETE_STARTS */ ""}
                                      ${debuggerUI}
                                      ${/* DELETE_ENDS */ ""}`,
              imagesUI,
              vImages,
              `<div class="index-badge">
                ${idx}
              </div>`,                
               `<div class=${pins&&pins[uniqueId]&&"pin-box"}>`,
                  `<div class=${pins&&pins[uniqueId]&&"pin-icon"}>`,
                  `</div>`,
                `</div>`,
                `<div class=${slotarr.includes(idx)&&"slot-box"}>`,
                  `<div class=${slotarr.includes(idx)&&"slot-icon"}>`,
                  `</div>`,
                `</div>`,

                
            `</div>`,
            `<div class="UNX-product-content">`,
            `<h3 class="UNX-product-title" title="${title}">${
              title || uniqueId || ""
            }</h3>`,
            priceUI,

            `</div>`,
           
            `</div>`,
          ].join("");
        },
      },
      spellCheck: {
        enabled: true,
        el: document.getElementById("didYouMeanWrapper"),
        template: templateUtils.spellCheckTemplate,
      },
      noResults: {
        el: document.getElementById("noResultWrapper"),
      },
      facet: {
        facetsEl: document.getElementById("facetsWrapper"),
        selectedFacetsEl: document.getElementById("selectedFacetWrapper"),
        onFacetLoad: templateUtils.onFacetLoad,
        isSearchable: false,
        defaultOpen: "ALL",
        rangeTemplate: templateUtils.getRangeTemplate,
        selectedFacetItemTemplate: templateUtils.selectedFacetItemTemplateUI,
      },
      pagination: {
        type: "FIXED_PAGINATION",
        el: document.querySelectorAll(".unxPagination"),
        pageLimit: 3,
        onPaginate: function () {
          templateUtils.scrollToTop();
        },
      },
      breadcrumb: {
        el: document.getElementById("breadcrumpContainer"),
      },
      pagesize: {
        enabled: false,
      },
      sort: {
        el: document.getElementById("sortWrapper"),
        options: templateUtils.getSortOptions(),
      },
      loader: {
        el: document.getElementById("loaderEl"),
        template: function () {
          return `<div class="UNX-loader"><img src="/ss/images/blueLoader.svg" alt="loading image"></div>`;
        },
      },
      productView: {
        el: document.getElementById("productViewTypeContainer"),
        template: templateUtils.productViewTemplate,
      },
      banner: {
        el: document.getElementById("bannerContainer"),
        openNewTab:true
      },
      variants: templateUtils.getVariantsWithFields(),
      onEvent: function (instance, type, state) {
        if (type === "AFTER_API_CALL") {
          window.postMessage(
            {
              id: "debugPreview",
              debugData: instance?.state?.responseObj,
            },
            "*"
          );
        }
        if (type === "AFTER_RENDER") {
          templateUtils.scrollToTop();
          new window.Choices(document.getElementById("unbxdSorter"), {
            searchEnabled: false,
            position: "bottom",
          });
        }
      },
      extraParams: {
        __ts: new Date().getTime(),
        ...(IS_VARIANTS_ENABLED && { "variants.relevant": "true" }),
        /** DELETE_STARTS */
        ...((window.UNBXD_USER || window.enableDebugMode) && {
          debug: "true",
          "debug.structured": "true",
          "brewer.debug": "true",
        }),
        /** DELETE_ENDS */
      },onQueryRedirect:(self, redirect)=>{
        if(redirect) {
            const {
                value,
                type
            } = redirect;
            if(type === "url") {
                window.open(value, "_blank");                                                          
            }
            return false;
        }
    }
    });
  };

  setUnbxdSearch();

  /* overriding library function  */
  window.UnbxdSearch.prototype.setInputValue = function () {

    let val = this.options.searchBoxEl.value;
    if (!val.replace(/\s/g, "").length) {
      val = "*";
      
    }
    this.options.productType = "SEARCH";
    val = val.indexOf("#") === 0 ? val.replace("#", "") : val;
    if (val) {
      this.resetAll();
      this.changeInput(val, this.events.changeInput);
      this.options.products.productType = "SEARCH";
      this.viewState.loadedFromSuggestion = false;
      this.state.selectedSort = "";
      this.setPageStart(0);
      this.resetViewState();
      this.getResults();
      
    }
  };

  const setUpEvents = function () {
    window.unbxdSearch.setInputValue();
    searchInput.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {

        window.unbxdSearch.setInputValue();
      }
    });
  };

  const renderInitialQuery = function () {
    const currentQueries = window.unbxdSearch.getQueryParams();
    if (!currentQueries.q) {
      window.unbxdSearch.getResults("*");
    }else{
      window.unbxdSearch.setInputValue();
    }
  };

  const renderAutosuggest = function () {
    window.unbxdAutoSuggestFunction($, Handlebars);
    $("#unbxdInput").unbxdautocomplete({
      siteName: window.UNBXD_SITE_KEY,
      APIKey: window.UNBXD_API_KEY,
      minChars: 1,
      showCarts: false,
      integrations: {
        universal: true,
      },
      template:
        (window.UNBXD_AUTO_CONFIG && window.UNBXD_AUTO_CONFIG.template) ||
        "2column",
      mainTpl: (window.UNBXD_AUTO_CONFIG &&
        window.UNBXD_AUTO_CONFIG.mainTpl) || [
        "inFields",
        "keywordSuggestions",
        "topQueries",
        "promotedSuggestions",
      ],
      sideTpl: ["popularProducts"],
      sideContentOn:
        (window.UNBXD_AUTO_CONFIG && window.UNBXD_AUTO_CONFIG.sideContentOn) ||
        "right",
      cartType: "separate",
      noResultTpl: "No results found.",

      onItemSelect: function (data) {
        if (data.type === "IN_FIELD" && data.filtername) {
          if (data.filtername) {
            window.location =
              window.location.origin +
              window.location.pathname +
              "?&q=" +
              encodeURI(data.value) +
              "&filter=" +
              data.filtername +
              "_uFilter:" +
              encodeURI('"' + data.filtervalue + '"');
          } else {
            window.location =
              window.location.origin +
              window.location.pathname +
              "?&q=" +
              encodeURI(data.value);
          }
        } else {
          window.location =
            window.location.origin +
            window.location.pathname +
            "?&q=" +
            encodeURI(data.value);
        }
      },
      onCartClick: function (obj) {
        return true;
      },
      isMobile: function () {
        if (document.body.clientWidth <= 480) {
          return true;
        } else {
          return false;
        }
      },
      theme: "#666666",
      sortByLength: true,
      inFields: {
        header: "",
        count: 1,
        showDefault: true,
        noOfInfields: 1,
      },
      topQueries: {
        count: 2,
        header: "",
      },
      keywordSuggestions: {
        count: 2,
        header: "",
      },
      popularProducts: {
        count: 6,
        price: true,
        priceFunctionOrKey: window.UNBXD_MAPPED_FIELDS.price,
        image: true,
        imageUrlOrFunction: window.UNBXD_MAPPED_FIELDS.imageUrl,
        currency: "$",
        header: "Popular Products",
        name: true,
        nameFunctionOrKey: window.UNBXD_MAPPED_FIELDS.title,
        view: "grid",
        rowCount: 3,
        fields: ["doctype", "autosuggest"].concat(
          templateUtils.getAutosuggestFields()
        ),
      },
      inputContainerSelector: ".UNX-input-wrapper",
      preferInputWidthTotalContent: true,
      preferOneColumnFullWidth: true,
      filtered: true,
      platform: "io",
      preferInputWidthMainContent: true,
      hideOnResize: true,
      removeOnBackButton: true,
      searchEndPoint: window.UNBXD_SEARCH_URL,
      resultsContainerSelector: "#autoSuggestInput",
      removeDuplicates: IS_VARIANTS_ENABLED,
      extraParams: {
        __ts: new Date().getTime(),
      },
      processResultsStyles: function (pos) {
        let counter = 0;
        const resultsObj = this.currentResults;
        const obArr = Object.keys(resultsObj);
        obArr.forEach((item) => {
          if (resultsObj[item].length > 0) {
            counter = counter + 1;
          }
        });
        const auElem = this.$results[0];
        const mainContent = auElem.querySelector(".unbxd-as-maincontent");
        if (counter === 1) {
          auElem.querySelector(".unbxd-as-sidecontent").style.width = "100%";
        }
        if (counter === 0 && mainContent) {
          mainContent.style.width = "100%";
        }
        return {
          top: "100%",
          left: "0",
        };
      },
    });
  };

  setUpEvents();
  setUpMobileEvents();
  renderAutosuggest();
  renderInitialQuery();
  
}


