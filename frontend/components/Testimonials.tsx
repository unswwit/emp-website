import styles from "../styles/Quotes.module.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { testimonials } from "../data/testimonials";

function QuoteCard({ data }: any) {
  return (
    <div className={styles.box}>
      <MDBCard className={styles.quoteCard}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="8" lg="9" xl="8">
              <div className={styles.flexBox}>
                <div>
                  <img
                    src={
                      data.photo.src ||
                      "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    }
                    alt={data.photo.alt || "Example Avatar"}
                    width="90"
                    height="90"
                  />
                </div>
                <div>
                  <MDBTypography blockquote>
                    <span className="font-italic">
                      {data.description ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.\
                      Pariatur sint nesciunt ad itaque aperiam expedita officiis\
                      incidunt minus facere, molestias quisquam impedit\
                      inventore."}
                    </span>
                  </MDBTypography>
                  <br />
                  <figcaption>{data.name || "Example Name"}</figcaption>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default function Testimonials() {
  return (
    <Slide>
      {testimonials.map((testimony, index) => (
        <MDBContainer key={index} className={styles.container}>
          <MDBCol xl="10">
            <QuoteCard data={testimony} />
          </MDBCol>
        </MDBContainer>
      ))}
    </Slide>
  );
}
