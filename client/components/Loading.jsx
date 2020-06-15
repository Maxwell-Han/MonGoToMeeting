import React, { useEffect } from "react";
import history from "../history";
import { Text } from "grommet";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = (props) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      history.push("/login");
    }, 4000);

    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return (
    <section className="auth-container">
      <p className="title">
        <Text color="brand" className="title-text">
          MONGOTOMEETING
        </Text>
      </p>
      <PulseLoader css={override} color="#27c7c2" size={50} loading={true} />
    </section>
  );
};

export default Loading;
