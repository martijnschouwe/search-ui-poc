import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  WithSearch,
  Sorting
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";

const connector = new AppSearchAPIConnector({
  searchKey: "search-ustkc8sitcfdgnzo8aveh8tf",
  engineName: "hob-search-poc",
  endpointBase:
    "https://hob-acceptance-product-search.ent.europe-west4.gcp.elastic-cloud.com"
});

const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      productId: { raw: {} },
      name: { raw: {} },
      commercialName: { raw: {} },
      productDescription: { raw: {} },
      seoLabel: { raw: {} },
      brand: { raw: {} },
      brandId: { raw: {} },
      gender: { raw: {} },
      genderId: { raw: {} },
      productType: { raw: {} },
      categories: { raw: {} },
      categoriesLevel1: { raw: {} },
      categoriesLevel2: { raw: {} },
      categoriesLevel3: { raw: {} },
      categoriesLevel4: { raw: {} },
      categoryIds: { raw: {} },
      categoryIdsLevel1: { raw: {} },
      categoryIdsLevel2: { raw: {} },
      categoryIdsLevel3: { raw: {} },
      categoryIdsLevel4: { raw: {} },
      productAttributes: { raw: {} },
      marketing: { raw: {} },
      fabricIds: { raw: {} },
      fabrics: { raw: {} },
      siblingProducts: { raw: {} },
      colorLabel: { raw: {} },
      color: { raw: {} },
      hexCode: { raw: {} },
      searchColorLabel: { raw: {} },
      searchColor: { raw: {} },
      seoLink: { raw: {} },
      colorVariantName: { raw: {} },
      colorVariantDescription: { raw: {} },
      availableImageTypes: { raw: {} },
      skus: { raw: {} },
      style: { raw: {} },
      sizesInStock: { raw: {} },
      sizesOutOfStock: { raw: {} },
      colorVariantAttributes: { raw: {} },
      publishedDate: { raw: {} },
      promotions: { raw: {} },
      activePrice: { raw: {} },
      fromPrice: { raw: {} },
      discountPercentage: { raw: {} },
      "skus.stock.storeStock": { raw: {} },
      "skus.stock.webStock": { raw: {} },
      "skus.stock.dcStock": { raw: {} },
      "promotions.type": { raw: {} },
      idUrlFriendly: { raw: {} }
    },
    search_fields: {
      productId: {},
      name: {},
      commercialName: {},
      productDescription: {},
      brand: {},
      gender: {},
      productType: {},
      categories: {},
      productAttributes: {},
      marketing: {},
      fabricIds: {},
      fabrics: {},
      siblingProducts: {},
      colorLabel: {},
      color: {},
      searchColorLabel: {},
      searchColor: {},
      colorVariantName: {},
      skus: {},
      style: {},
      sizesInStock: {},
      sizesOutOfStock: {},
      colorVariantAttributes: {},
      promotions: {},
      activePrice: {},
      fromPrice: {}
    },
    filters: [
      {
        field: "brandId",
        type: "any",
        values: [
          "brand_cotton_club_women",
          "brand_cotton_club",
          "brand_cottonclub_giftcard"
        ]
      },
      {
        field: "categoryIdsLevel1",
        type: "any",
        values: ["women"]
      }
    ],
    disjunctiveFacets: [""],
    facets: {
      searchColor: { type: "value", size: 30 }
    }
  },
  autocompleteQuery: {
    results: {
      result_fields: {
        productDescription: { snippet: { size: 100, fallback: true } },
        seoLabel: { raw: {} },
        productType: { raw: {} }
      }
    }
  }
};

export default function App() {
  const adjustSearchHandler = (e: Event) => {
    e.preventDefault();
    console.log("adjust");
  };

  return (
    <>
      <a href="" onClick={() => adjustSearchHandler()}>
        Jassen &amp; Jacks{" "}
      </a>
      <SearchProvider config={config}>
        <WithSearch
          mapContextToProps={({ wasSearched }) => ({
            wasSearched
          })}
        >
          {({ wasSearched }) => {
            return (
              <div className="App">
                <ErrorBoundary>
                  <Layout
                    header={
                      <SearchBox
                        debounceLength={0}
                        autocompleteResults={{
                          sectionTitle: "Suggested Results",
                          titleField: "productType",
                          urlField: "seoLabel"
                        }}
                      />
                    }
                    sideContent={
                      <div>
                        <Facet
                          field="searchColor"
                          label="Color"
                          isFilterable={true}
                        />
                      </div>
                    }
                    bodyContent={
                      <>
                        <Sorting
                          sortOptions={[
                            {
                              name: "Aanbevolen",
                              value: "",
                              direction: ""
                            },
                            {
                              name: "Aanbevolen sale",
                              value: "promotions.label",
                              direction: ""
                            },
                            {
                              name: "Nieuw",
                              value: "publishedDate",
                              direction: "asc"
                            },
                            {
                              name: "Prijs laag - hoog",
                              value: "activePrice",
                              direction: "asc"
                            },
                            {
                              name: "Prijs hoog - laag",
                              value: "activePrice",
                              direction: "desc"
                            }
                          ]}
                        />
                        <Results
                          titleField="title"
                          urlField="nps_link"
                          thumbnailField="image_url"
                          shouldTrackClickThrough
                        />
                      </>
                    }
                    bodyHeader={
                      <React.Fragment>
                        {wasSearched && <PagingInfo />}
                        {wasSearched && <ResultsPerPage />}
                      </React.Fragment>
                    }
                    bodyFooter={<Paging />}
                  />
                </ErrorBoundary>
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
    </>
  );
}
