import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import React from "react";
import SEO from "../components/seo";
import { HeroStyles } from "../components/Homepage/styles";
import styled from "styled-components";
import { useForm, ValidationError } from "@formspree/react";
function ContactForm() {
  const [state, handleSubmit] = useForm("mgedpvyd");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}
function TestPage() {
  return <ContactForm />;
}
export default TestPage;
