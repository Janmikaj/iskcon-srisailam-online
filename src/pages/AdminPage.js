import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Event, AddCircle } from "@mui/icons-material";
import axios from "axios";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const token = localStorage.getItem("token");

  // ✅ Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Handle add / update event
  const handleSave = async () => {
    try {
      if (!newEvent.title || !newEvent.date) {
        return setSnackbar({ open: true, message: "Title and Date are required", severity: "warning" });
      }

      if (editId) {
        await axios.put(`http://localhost:5000/events/${editId}`, newEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Event updated successfully", severity: "success" });
      } else {
        await axios.post("http://localhost:5000/events", newEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Event added successfully", severity: "success" });
      }

      setNewEvent({ title: "", date: "", description: "", image: "" });
      setEditId(null);
      fetchEvents();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to save event", severity: "error" });
      console.error(err);
    }
  };

  // ✅ Handle edit
  const handleEdit = (event) => {
    setEditId(event._id);
    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
      image: event.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Event deleted", severity: "info" });
      fetchEvents();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete event", severity: "error" });
    }
  };

  // ✅ Snackbar close
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Manage events for ISKCON Srisailam
      </Typography>

      {/* Add/Edit Form */}
      <Card sx={{ p: 3, mb: 5, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AddCircle color="secondary" /> {editId ? "Edit Event" : "Add New Event"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="grid" gap={2}>
          <TextField
            label="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            fullWidth
          />
          <TextField
            label="Image URL (optional)"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
            sx={{ mt: 1, fontWeight: "bold" }}
          >
            {editId ? "Update Event" : "Add Event"}
          </Button>
        </Box>
      </Card>

      {/* Event List */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Event color="primary" /> All Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} key={event._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "0.3s", "&:hover": { boxShadow: 5 } }}>
              {event.image && (
                <Box
                  component="img"
                  src={event.image}
                  alt={event.title}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📅 {event.date}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {event.description || "No description available"}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Tooltip title="Edit">
                  <IconButton color="secondary" onClick={() => handleEdit(event)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(event._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPage;
