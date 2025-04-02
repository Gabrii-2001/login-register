"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Row, InputGroup } from "react-bootstrap";
import styles from "@/login/login.module.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  file: Yup.mixed().required("File is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

export default function Login() {
  return (
    <div className={styles.login}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-sm-12 mt-5">
            <div className={styles.login_form}>
              <h2 className="text-white text-center pt-4 pb-4">Form</h2>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  username: "",
                  city: "",
                  state: "",
                  zip: "",
                  file: null,
                  terms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("📌 Form Data Submitted:", values);
                  alert("🎉 Form Submitted Successfully!");
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form noValidate>
                    {/* First & Last Name */}
                    <Row className="mb-3">
                      <Col md="6">
                        <label>First Name</label>
                        <Field type="text" name="firstName" placeholder="First Name" className="form-control" />
                        <ErrorMessage name="firstName" component="div" className={styles.text_danger} />
                      </Col>
                      <Col md="6">
                        <label>Last Name</label>
                        <Field type="text" name="lastName" placeholder="Last Name" className="form-control" />
                        <ErrorMessage name="lastName" component="div" className={styles.text_danger} />
                      </Col>
                    </Row>

                    {/* Username */}
                    <Row className="mb-3">
                      <Col md="12">
                        <label>Username</label>
                        <InputGroup>
                          <InputGroup.Text>@</InputGroup.Text>
                          <Field type="text" name="username" placeholder="User Name" className="form-control" />
                        </InputGroup>
                        <ErrorMessage name="username" component="div" className={styles.text_danger} />
                      </Col>
                    </Row>

                    {/* City, State, Zip */}
                    <Row className="mb-3">
                      <Col md="4">
                        <label>City</label>
                        <Field type="text" name="city" placeholder="City" className="form-control" />
                        <ErrorMessage name="city" component="div" className={styles.text_danger} />
                      </Col>
                      <Col md="4">
                        <label>State</label>
                        <Field type="text" name="state" placeholder="State" className="form-control" />
                        <ErrorMessage name="state" component="div" className={styles.text_danger} />
                      </Col>
                      <Col md="4">
                        <label>Zip Code</label>
                        <Field type="text" name="zip" placeholder="Zip Code" className="form-control" />
                        <ErrorMessage name="zip" component="div" className={styles.text_danger} />
                      </Col>
                    </Row>

                    {/* File Upload */}
                    <Row className="mb-3">
                      <Col md="12">
                        <label>Upload File</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
                        />
                        <ErrorMessage name="file" component="div" className={styles.text_danger} />
                      </Col>
                    </Row>

                    {/* Terms & Conditions */}
                    <Row className="mb-3">
                      <Col md="12">
                        <div className="form-check">
                          <Field type="checkbox" name="terms" className="form-check-input" id="termsCheck" />
                          <label className="form-check-label" htmlFor="termsCheck">
                            Agree to terms and conditions
                          </label>
                        </div>
                        <ErrorMessage name="terms" component="div" className={styles.text_danger} />
                      </Col>
                    </Row>

                    {/* Show Data in Console (Debugging) */}
                    <pre className="bg-dark text-white p-3 rounded">
                      {JSON.stringify(values, null, 2)}
                    </pre>

                    {/* Submit Button */}
                    <Button type="submit" variant="primary" className={`${styles.Submit_Form} w-100 mt-3 mb-3`}>
                      Submit Form
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
