import styles from '../styles/Quotes.module.css';
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   // MDBCarousel,
//   // MDBCarouselInner,
//   // MDBCarouselItem,
//   MDBTypography,
//   // MDBIcon,
// } from 'mdb-react-ui-kit';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { testimonials } from '../data/testimonials';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

// function QuoteCard ({ data }: any) {
//   return (
//     <div className={styles.box}>
//       <MDBCard className={styles.quoteCard}>
//         <MDBCardBody>
//           <MDBRow>
//             <MDBCol md='8' lg='9' xl='8'>
//               <div className={styles.flexBox}>
//                 <div>
//                   <img
//                     src={
//                       data.photo.src ||
//                       'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp'
//                     }
//                     alt={data.photo.alt || 'Example Avatar'}
//                   />
//                 </div>
//                 <div>
//                   <MDBTypography blockquote>
//                     <span className='font-italic'>
//                       {data.description ||
//                         'Lorem ipsum dolor sit amet consectetur adipisicing elit.\
//                       Pariatur sint nesciunt ad itaque aperiam expedita officiis\
//                       incidunt minus facere, molestias quisquam impedit\
//                       inventore.'}
//                     </span>
//                   </MDBTypography>
//                   <br />
//                   <figcaption>{data.name || 'Example Name'}</figcaption>
//                 </div>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBCardBody>
//       </MDBCard>
//     </div>
//   );
// }

const TimelineCard = ({ data }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 3,
        backgroundColor: 'white',
        margin: 2,
        width: 332,
        // height: 'auto',
        height: 569,
      }}
    >
      <Avatar
        src={
          data.photo.src ||
          'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp'
        }
        alt={data.photo.alt}
        sx={{ width: 150, height: 150, margin: 4 }}
      />
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: 0.5,
        }}
      >
        {data.name}
      </Box>
      <Box
        sx={{
          color: '#E85F5C',
          textAlign: 'center',
          fontSize: 18,
          marginBottom: 1,
          paddingX: 5,
        }}
      >
        {data.role}
      </Box>
      <Box
        sx={{
          fontSize: 20,
          marginTop: 1,
          marginBottom: 2,
          textAlign: 'center',
          paddingX: 2,
          overflowY: 'auto',
          // maxHeight: 150,
        }}
      >
        {data.description}
      </Box>
    </Box>
  );
};

export default function Testimonials () {
  return (
    <Slide>
      {testimonials.map(
        (
          testimony
          // index
        ) => (
          // <MDBContainer key={index} className={styles.container}>
          //   <MDBCol xl="10">
          <TimelineCard data={testimony} />
          //   </MDBCol>
          // </MDBContainer>
        )
      )}
    </Slide>
  );
}
