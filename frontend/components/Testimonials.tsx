import styles from '../styles/Quotes.module.css'
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
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

function QuoteCard() {
  return (
    <div className={styles.box}>
      <MDBCard className={styles.quoteCard}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="8" lg="9" xl="8">
              <div className={styles.flexBox}>
                <div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    alt="woman avatar"
                    width="90"
                    height="90"
                  />
                </div>
                <div>
                  <MDBTypography blockquote>
                    <span className="font-italic">
                      Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Pariatur sint nesciunt ad itaque aperiam
                      expedita officiis incidunt minus facere, molestias
                      quisquam impedit inventore.
                    </span>
                  </MDBTypography>
                  <br/>
                  <figcaption>
                    Example Name
                  </figcaption>
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
      <MDBContainer className={styles.container}>
          <MDBCol xl="10">
            <QuoteCard />
          </MDBCol>
      </MDBContainer>
    </Slide>
  );
}