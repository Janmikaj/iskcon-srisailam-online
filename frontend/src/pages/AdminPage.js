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
  Tabs,
  Tab
} from "@mui/material";
import { Edit, Delete, Event, AddCircle } from "@mui/icons-material";
import api from "../utils/api";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setSnackbar({ open: true, message: "Failed to fetch events", severity: "error" });
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // Save Event
  const handleSave = async () => {
    if (!newEvent.title || !newEvent.date) {
      return setSnackbar({ open: true, message: "Title and Date are required", severity: "warning" });
    }

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editId) {
        await api.put(`/events/${editId}`, newEvent, config);
        setSnackbar({ open: true, message: "Event updated successfully", severity: "success" });
      } else {
        await api.post("/events", newEvent, config);
        setSnackbar({ open: true, message: "Event added (emails sending...)", severity: "success" });
      }

      setNewEvent({ title: "", date: "", description: "", image: "" });
      setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save event", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
      image: event.image,
    });
    setTab(0); // Switch to Add tab
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/events/${id}`, config);
      setSnackbar({ open: true, message: "Event deleted", severity: "info" });
      fetchEvents();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete event", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Filter by search
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Group events by week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

  const previousEvents = filteredEvents.filter((e) => new Date(e.date) < startOfWeek);
  const presentEvents = filteredEvents.filter(
    (e) => new Date(e.date) >= startOfWeek && new Date(e.date) <= endOfWeek
  );
  const upcomingEvents = filteredEvents.filter((e) => new Date(e.date) > endOfWeek);

  const renderEventList = (list) => (
    <Grid container spacing={3}>
      {list.map((event) => (
        <Grid item xs={12} sm={6} key={event._id}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 5 } }}>
            {event.image && (
              <Box component="img" src={event.image} alt={event.title}
                sx={{ width: "100%", height: 180, objectFit: "cover" }} />
            )}
            <CardContent>
              <Typography variant="h6" color="primary">{event.title}</Typography>
              <Typography variant="body2">📅 {event.date}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {event.description || "No description available"}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Tooltip title="Edit"><IconButton onClick={() => handleEdit(event)}><Edit /></IconButton></Tooltip>
              <Tooltip title="Delete"><IconButton color="error" onClick={() => handleDelete(event._id)}><Delete /></IconButton></Tooltip>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>

      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mb: 4 }}>
        <Tab label="Add Event" />
        <Tab label="Manage Events" />
      </Tabs>

      {/* TAB 1: ADD EVENT */}
      {tab === 0 && (
        <Card sx={{ p: 3, mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            <AddCircle /> {editId ? "Edit Event" : "Add New Event"}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="grid" gap={2}>
            <TextField label="Title" fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField label="Date" type="date" fullWidth
              value={newEvent.date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <TextField label="Description" multiline rows={3} fullWidth
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <TextField label="Image URL" fullWidth
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            />
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              {loading ? "Processing..." : (editId ? "Update Event" : "Add Event")}
            </Button>
          </Box>
        </Card>
      )}

      {/* TAB 2: VIEW EVENTS */}
      {tab === 1 && (
        <>
          {/* Search Bar */}
          <TextField
            label="Search events..."
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Event Sections */}
          <Typography variant="h6" sx={{ mb: 1 }}>Previous Events</Typography>
          {renderEventList(previousEvents)}

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>This Week</Typography>
          {renderEventList(presentEvents)}

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Upcoming Events</Typography>
          {renderEventList(upcomingEvents)}
        </>
      )}

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

    </Container>
  );
};

export default AdminPage;
