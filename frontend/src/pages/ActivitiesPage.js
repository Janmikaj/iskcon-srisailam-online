import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Badge,
  Grid,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const ActivitiesPage = () => {
  const { t } = useTranslation();
  const [view, setView] = useState('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [donateOpen, setDonateOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Fetch only backend events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        const backendEvents = res.data.map(ev => ({
          ...ev,
          date: new Date(ev.date),
        }));
        backendEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(backendEvents);
      } catch (err) {
        console.error('❌ Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const getEventsForDate = (date) =>
    events.filter((event) => isSameDay(new Date(event.date), date));

  const EventDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const hasEvents = getEventsForDate(day).length > 0;
    return (
      <Badge
        overlap="circular"
        color="secondary"
        variant={hasEvents ? 'dot' : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          sx={{
            backgroundColor: hasEvents ? '#e0f2f1' : undefined,
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: hasEvents ? '#b2dfdb' : '#e0e0e0',
            },
          }}
        />
      </Badge>
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length > 0) {
      setSelectedEvents(dayEvents);
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);
  const handleDonateClick = () => setDonateOpen(true);
  const handleDonateSubmit = () => {
    alert(`🙏 Thank you for donating ₹${donationAmount}!`);
    setDonationAmount('');
    setDonateOpen(false);
  };
  const handleDonateClose = () => setDonateOpen(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        px: { xs: 2, md: 6 },
        background: 'linear-gradient(135deg, #f9fafb, #e0f7fa)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{
            color: '#00796b',
            textTransform: 'uppercase',
            mb: 3,
          }}
        >
          {t('Activities & Events')}
        </Typography>

        <Box display="flex" justifyContent="center" mb={3}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view selector"
          >
            <ToggleButton value="list">{t('Card View')}</ToggleButton>
            <ToggleButton value="calendar">{t('Calendar View')}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          {loading ? (
            <Typography>Loading events...</Typography>
          ) : view === 'list' ? (
            <Grid container spacing={2}>
              {events.length === 0 ? (
                <Typography>No events available.</Typography>
              ) : (
                events.map((event, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      onClick={() => {
                        setSelectedEvents([event]);
                        setOpen(true);
                      }}
                      sx={{
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
                        borderRadius: 2,
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ color: '#004d40', mb: 1 }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          📅 {new Date(event.date).toLocaleDateString()}
                        </Typography>
                        {event.time && (
                          <Typography variant="body2" color="textSecondary">
                            ⏰ {event.time}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box display="flex" justifyContent="center">
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  slots={{ day: EventDay }}
                  defaultCalendarMonth={new Date()}
                />
              </Box>
            </LocalizationProvider>
          )}
        </Paper>

        {/* Event Details Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#00796b' }}>
            {selectedEvents.length === 1
              ? selectedEvents[0].title
              : `Events on ${selectedEvents[0]?.date.toLocaleDateString()}`}
          </DialogTitle>
          <DialogContent>
            {selectedEvents.map((event, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <DialogContentText>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </DialogContentText>
                {event.time && (
                  <DialogContentText>
                    <strong>Time:</strong> {event.time}
                  </DialogContentText>
                )}
                <DialogContentText>
                  <strong>Details:</strong> {event.description}
                </DialogContentText>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDonateClick} color="primary" variant="outlined">
              Donate
            </Button>
            <Button onClick={handleClose} color="success" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Donation Dialog */}
        <Dialog open={donateOpen} onClose={handleDonateClose}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#00796b' }}>
            Make a Donation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your generous donation supports our temple activities and community services. 🙏
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Donation Amount (₹)"
              type="number"
              fullWidth
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDonateClose}>Cancel</Button>
            <Button
              onClick={handleDonateSubmit}
              color="success"
              variant="contained"
              disabled={!donationAmount}
            >
              Donate
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ActivitiesPage;
