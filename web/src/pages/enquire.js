import React from "react";
import Container from "../components/container";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import Carousel from "nuka-carousel";
import Placeholder from "../assets/placeholder.svg";
import { graphql } from "gatsby";
import { HeroStyles } from "../components/Homepage/styles";
import { EnquirePageStyles } from "../styles/EnquirePageStyles";
import Image from "gatsby-plugin-sanity-image";
import Search from "../components/Search";
import countries from "../lib/countries";
import { Button } from "../components/Button";
import { getQueryStringParams } from "../lib";
import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Query_Villa } from "../gql";

const validationSchema = yup
  .object({
    firstName: yup.string().required("Required*"),
    lastName: yup.string().required("Required*"),
    dateOfTravel: yup.string().required("Required*"),
    duration: yup.string().required("Required*"),
    countryofResidence: "",
    title: yup.string().required("Required*"),
    email: yup.string().email("Enter is not valid").required("Required*"),
    phoneNumber: yup.string().required("Required*"),
  })
  .required();

export const query = graphql`
  query EnquirePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      newsLetterTitle
      magazinePageImage {
        ...SanityImage
        alt
      }

      contactUs {
        address
        email
        phoneOne
        contactPeople {
          name
          image {
            ...SanityImage
            alt
          }
        }
        hours {
          days
          hours
        }
        businessHoursDescription
      }
    }
    resorts: allSanityResort {
      nodes {
        name
      }
    }
    villas: allSanityVilla(filter: { active: { eq: true } }) {
      nodes {
        name
        resort {
          name
        }
      }
    }
  }
`;

const Enquire = (props) => {
  const { data } = props;
  const site = (data || {}).site;
  const resorts = (data || {}).resorts;
  const villas = (data || {}).villas;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  const { id: resortId, name: villaName } = getQueryStringParams();

  const budgetRanges = [
    "£3,500 to £5,000",
    "£5,000 to £7,500",
    "£7,500 to 10,000",
    "Above £10,000 ",
  ];

  const defaultValues = {
    dateOfTravel: "",
    duration: "",
    budget: budgetRanges[0],
    comments: "",
    countryofResidence: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adults: "",
    childrens: 0,
    countryCode: "",
    holidayType: "",
  };

  const {
    control,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { fields: childrensAgeField, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "childrensAge", // unique name for your Field Array
  });

  const childrensField = watch("childrens");

  useEffect(() => {
    if (childrensField) {
      if (childrensAgeField.length) reset({ childrensAge: [] });
      [...Array(parseInt(childrensField)).keys()].forEach(() => {
        append({ age: 0 });
      });
    }
  }, [childrensField]);

  const { data: villaData, error } = useQuery(Query_Villa, {
    variables: { id: resortId },
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      fetch("https://getform.io/f/209039b1-5178-40df-8c4a-97f28465ec11", {
        method: "POST",
        body: formData,
        // headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.status === 200) {
            window.location.href = response.url;
          }
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log("Error", err);
    }
  };

  const villa = villaData?.Villa;
  const resortName = villa?.resort?.name;
  const headerImages = villa?.headerImages;

  const {
    dateOfTravel,
    duration,
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
  } = errors;
  return (
    <Layout {...props}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />

      <Container>
        <HeroStyles>
          <h1> {site.description}</h1>
          {data.site.magazinePageImage && data.site.magazinePageImage.asset && (
            <Image
              {...data.site.magazinePageImage}
              alt={data.site.magazinePageImage.alt}
            />
          )}
        </HeroStyles>
        <EnquirePageStyles>
          <form
            enctype="multipart/form-data"
            onSubmit={(e) => handleSubmit(onSubmit)(e)}
          >
            <div className="room-villa-section">
              <div className="header-content">
                <h2>Request A Quote</h2>
                <div className="villa-name">{resortName}</div>
                <div className="divider" />
                <div className="resort-name">{villa?.name}</div>
                <div className="villa-features">
                  <Measure />
                  <TwoPeople />
                  <Bed />
                  <Shower />
                  <SwimmingPool />
                </div>
              </div>
              <div className="footer-content">
                <Carousel
                  speed={1000}
                  adaptiveHeight={true}
                  className="carousel"
                  slidesToShow={1}
                  // cellSpacing={10}
                >
                  {headerImages?.images &&
                    headerImages?.images?.map((image) => {
                      return image?.asset ? (
                        <Image className="image" {...image} alt={image.alt} />
                      ) : (
                        <Placeholder />
                      );
                    })}
                </Carousel>
              </div>
            </div>
            <div className="holidays-details-section">
              <h2>Holiday details</h2>
              <div className="two-column form-content">
                <div className="form-control">
                  <label>
                    Date of travel<span className="required">*</span>
                  </label>
                  <input
                    {...register("dateOfTravel")}
                    type="date"
                    placeholder=""
                  />
                  <ErrorField error={dateOfTravel} />
                </div>
                <div className="form-control">
                  <label>
                    Duration<span className="required">*</span>
                  </label>
                  <select {...register("duration")}>
                    {[...Array(30).keys()].map((number) => (
                      <option key={number + 1} value={number + 1}>
                        {number + 1}
                      </option>
                    ))}
                  </select>
                  <ErrorField error={dateOfTravel} />
                </div>
              </div>
              <div className="form-control">
                <label>Country of Residence</label>
                <select {...register("countryOfResidence")}>
                  <option>PAKISTAN</option>
                  <option>UK</option>
                  <option>CANADA</option>
                </select>
              </div>
              <div className="form-control">
                <label>Holiday Type</label>
                <select {...register("holidayType")}>
                  <option>Honeymoon</option>
                  <option>Anniversary</option>
                  <option>Relaxation holiday</option>
                  <option>Romantic holiday</option>
                </select>
              </div>
              <div className="form-control">
                <label>Holiday budget</label>
                <select {...register("budget")}>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label>Tell us a bit more</label>
                <textarea {...register("comments")} />
              </div>
            </div>
            <div className="yours-details-section">
              <h2>Your details</h2>
              <div className="two-column form-content">
                <div className="form-control">
                  <label>
                    Title<span className="required">*</span>
                  </label>
                  <select {...register("title")}>
                    {["Mr.", "Mrs."].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                  <ErrorField error={title} />
                </div>
                <div className="form-control">
                  <label>
                    First name<span className="required">*</span>
                  </label>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder=""
                  />
                  <ErrorField error={firstName} />
                </div>
              </div>
              <div className="form-control">
                <label>
                  Last name<span className="required">*</span>
                </label>
                <input {...register("lastName")} type="text" placeholder="" />
                <ErrorField error={lastName} />
              </div>
              <div className="form-control">
                <label>
                  e-mail address<span className="required">*</span>
                </label>
                <input {...register("email")} type="email" placeholder="" />
                <ErrorField error={email} />
              </div>
              <div className="three-column ">
                <div className="form-control">
                  <label>
                    Telephone number<span className="required">*</span>
                  </label>
                  <div className="phone">
                    <select {...register("countryCode")}>
                      {countries.map(({ code, name }, index) => (
                        <option
                          key={`${code}-${index}`}
                          value={`${code}${name}`}
                        >
                          {code} {name}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register("phoneNumber")}
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <ErrorField error={phoneNumber} />
                </div>

                <div className="form-control">
                  <label>Adults</label>
                  <select {...register("adults")}>
                    {[...Array(7).keys()].map((number) => (
                      <option key={number + 1} value={number + 1}>
                        {number + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label>Children</label>
                  <select {...register("childrens")}>
                    {[...Array(7).keys()].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {childrensAgeField?.length ? (
                <div className="form-control">
                  <label>Childrens Age at the time of travel</label>
                  <div className="four-column">
                    {childrensAgeField?.map((field, index) => (
                      <select
                        key={field.id}
                        style={{ marginBottom: "2rem" }} // important to include key with field's id
                        {...register(`childrensAge.${index}.value`)}
                      >
                        {[...Array(17).keys()].map((number) => (
                          <option key={number} value={number}>
                            {number}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              ) : null}
              <Button
                type="submit"
                style={{ background: "var(--secondary)", color: "#fff" }}
              >
                Enquire now
              </Button>
            </div>
          </form>
        </EnquirePageStyles>
      </Container>
    </Layout>
  );
};

const ErrorField = ({ error }) => {
  return (
    <span style={{ marginTop: "1rem", color: "red" }}>{error?.message}</span>
  );
};

export default Enquire;
