import React from "react";
import Header from "../components/Header/Header";
import { DATA_STATES } from "../components/interfaces";
import Spinner from "../components/Spinner/Spinner";

interface PageWrapperProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  loading?: DATA_STATES;
}

const links = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
];

const Content = (props: PageWrapperProps) => {
  if (props.loading === DATA_STATES.waiting) {
    return (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  }

  if (props.loading === DATA_STATES.error) {
    return (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occurred fetching the data!
      </div>
    );
  }
  return <>{props.children}</>;
};

const PageWrapper = (props: PageWrapperProps) => (
  <>
    <div className="sticky top-0">
      <Header links={links} />
    </div>
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-9xl text-white">MARZ VFX</span>
      <Content {...props} />
    </div>
  </>
);

export default PageWrapper;
