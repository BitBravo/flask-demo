import { rest } from "msw";
import { setupServer } from "msw/node";
import { PRODUCT_URL } from "../ApiHelper";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
  it("shouldDisplayLoadingSpinner", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
  });

  it("shouldDisplayPipelineContainer", async () => {
    // set up mock for axios.get
    const response = {
      data: [
        {
          ProductID: 1,
          ProductName: "Hat",
          ProductPhotoURL:
            "https://i5.walmartimages.com/asr/7fbd346b-d208-4a39-a7d8-f2d13654e51b.73f80f63f6aeefcb5096ebab8082430e.jpeg",
          ProductStatus: "Active",
        },
      ],
      message: "",
    };
    const server = setupServer(
      rest.get(PRODUCT_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId(`product-container`)).toBeInTheDocument();
    });
    server.close();
  });

  it("shouldDisplayErrorMessage", async () => {
    // set up mock for axios.get
    const response = {
      data: [],
      message: "Error",
    };
    const server = setupServer(
      rest.get(PRODUCT_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
    });
    server.close();
  });
});
