import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRequest, getLoanRequest } from "../services/serviceRequest";

const EditLoanRequestForm = () => {
  const { id, requestId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    created_at: "",
    funded_at: "",
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const request = await getLoanRequest(id, requestId);
        setFormData({
          title: request.title,
          description: request.description,
          value: request.value,
          created_at: request.created_at ? request.created_at.slice(0, 10) : "",
          funded_at: request.funded_at ? request.funded_at.slice(0, 10) : "",
          accepted_proposal_id: request.accepted_proposal_id || "",
        });
      } catch (err) {
        setError("Error fetching loan request.");
      }
    };
    fetchRequest();
  }, [id, requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateRequest(id, requestId, formData);
      if (updatedData) {
        console.log("Request updated successfully:", updatedData);
        navigate(`/borrowers/${id}`);
      }
    } catch (err) {
      setError("Error updating request.");
    }
  };

  return (
    <div className="Loan-Request">
      <h2>Edit Loan Application</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="value">Loan Amount Requested</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />

        <label htmlFor="created_at">Created At</label>
        <input
          type="date"
          id="created_at"
          name="created_at"
          value={formData.created_at}
          onChange={handleChange}
          required
        />

        <label htmlFor="funded_at">Funded At</label>
        <input
          type="date"
          id="funded_at"
          name="funded_at"
          value={formData.funded_at || ""}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">Submit Changes</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EditLoanRequestForm;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Paper,
//   Card,
//   CardContent,
//   Link,
// } from "@mui/material";
// import { updateRequest, getLoanRequest } from "../services/serviceRequest";

// const EditLoanRequestForm = () => {
//   const { id, requestId } = useParams();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     value: "",
//     ficoScore: "",
//   });
//   const [createdDate, setCreatedDate] = useState(
//     new Date().toISOString().slice(0, 10)
//   );

//   useEffect(() => {
//     const fetchRequest = async () => {
//       try {
//         const request = await getLoanRequest(id, requestId);
//         setFormData({
//           title: request.title,
//           description: request.description,
//           value: request.value,
//           ficoScore: request.ficoScore,
//         });
//         if (request.created_at) {
//           setCreatedDate(request.created_at.slice(0, 10));
//         }
//       } catch (err) {
//         setError("Error fetching loan request.");
//       }
//     };
//     fetchRequest();
//   }, [id, requestId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedData = await updateRequest(id, requestId, formData);
//       if (updatedData) {
//         console.log("Request updated successfully:", updatedData);
//         navigate(`/borrowers/${id}`);
//       }
//     } catch (err) {
//       setError("Error updating request.");
//     }
//   };

//   const handleCancelToBorrowerDashboard = () => {
//     navigate(`/borrowers/dashboard`);
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         backgroundColor: "#f6f7f8",
//         padding: "2em",
//         borderRadius: "8px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           backgroundColor: "#ffffff",
//           padding: "2em",
//           borderRadius: "8px",
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="left"
//           sx={{
//             color: "#00a250",
//             marginBottom: "1em",
//             fontWeight: "bold",
//           }}
//         >
//           Edit Loan Request
//         </Typography>
//         <Typography
//           variant="body1"
//           align="left"
//           sx={{
//             marginBottom: "1em",
//           }}
//         >
//           Created Date: {createdDate}
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 disabled
//                 fullWidth
//                 id="ficoScore"
//                 label="FICO Score"
//                 name="ficoScore"
//                 value={formData.ficoScore}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="title"
//                 label="Title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 inputProps={{ maxLength: 140 }}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="description"
//                 label="Description"
//                 name="description"
//                 multiline
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 id="value"
//                 label="Loan Amount Requested"
//                 name="value"
//                 type="number"
//                 value={Number(formData.value)}
//                 onChange={handleChange}
//                 inputProps={{ step: "0.01", min: "0" }}
//                 variant="outlined"
//               />
//             </Grid>

//             <Grid item xs={12} display="flex" justifyContent="space-between">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#00a250",
//                   color: "#ffffff",
//                   "&:hover": {
//                     backgroundColor: "#008f43",
//                   },
//                 }}
//               >
//                 Submit Changes
//               </Button>

//               <Button
//                 variant="outlined"
//                 onClick={handleCancelToBorrowerDashboard}
//                 sx={{
//                   color: "#555555",
//                   borderColor: "#cccccc",
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                     borderColor: "#aaaaaa",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//             </Grid>

//             {error && (
//               <Grid item xs={12}>
//                 <Typography color="error" variant="body1">
//                   {error}
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Box>
//         <Card
//           sx={{
//             marginTop: "2em",
//             backgroundColor: "#f6f7f8",
//             padding: "1em",
//             borderRadius: "8px",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Attachments:
//             </Typography>
//             <Typography variant="body1">
//               <Link href="#" underline="hover" sx={{ color: "#00a250" }}>
//                 1. FICO Score
//               </Link>
//               <Typography
//                 component="span"
//                 sx={{ color: "green", fontWeight: "bold" }}
//               >
//                 {" "}
//                 ✔ Verified
//               </Typography>
//             </Typography>
//             <Typography variant="body1">
//               <Link href="#" underline="hover" sx={{ color: "#00a250" }}>
//                 2. Secretary of State Certificate
//               </Link>
//               <Typography
//                 component="span"
//                 sx={{ color: "green", fontWeight: "bold" }}
//               >
//                 {" "}
//                 ✔ Verified
//               </Typography>
//             </Typography>
//             <Typography variant="body1">
//               <Link href="#" underline="hover" sx={{ color: "#00a250" }}>
//                 3. Driver's Licence
//               </Link>
//               <Typography
//                 component="span"
//                 sx={{ color: "green", fontWeight: "bold" }}
//               >
//                 {" "}
//                 ✔ Verified
//               </Typography>
//             </Typography>
//           </CardContent>
//         </Card>
//       </Paper>
//     </Container>
//   );
// };

// export default EditLoanRequestForm;
