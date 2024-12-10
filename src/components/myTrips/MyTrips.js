import React, { useState } from 'react';
import { Box, Card, Typography, IconButton, Container, Grid, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import ParticipantsList from '../students/ParticipantsList';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ title, onAdd, hideAddIcon, isMainCard }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    onClick={onAdd}
  >
    <Card
      sx={{
        position: 'relative',
        minHeight: isMainCard ? '200px' : '150px',  
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {!hideAddIcon && (
        <IconButton
          sx={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      )}
    </Card>
  </motion.div>
);

const TripBag = ({ visible, itemCount, onBagClick }) => (
  <motion.div
    style={{
      position: 'fixed',
      bottom: -20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      cursor: 'pointer'
    }}
    onClick={onBagClick}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: visible ? 1 : 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '-20px',
          marginTop: '-30px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            mb: 0,
            position: 'relative',
            top: '70px',
            marginBottom: '-50px',
            left: '-15px'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#333',
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 600,
              textAlign: 'center',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            תיק טיול
          </Typography>
          <Box
            sx={{
              backgroundColor: '#388E3C',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              position: 'relative',
              top: '-10px',
              right: '-10px'
            }}
          >
            {itemCount}
          </Box>
        </Box>

        <Box
          component="button"
          sx={{
            position: 'relative',
            width: '400px',
            height: '400px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            background: 'none',
            padding: 0,
            '&:focus': {
              outline: 'none'
            },
            '&:focus-visible': {
              outline: 'none'
            },
            '&:active': {
              outline: 'none'
            },
            '&:hover': {
              outline: 'none'
            }
          }}
        >
          <img 
            src="/trip-bag.png"
            alt="תיק טיול"
            draggable="false"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.25))',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          />
        </Box>
      </motion.div>
    </motion.div>
  </motion.div>
);

const DocumentAnimation = ({ isAnimating }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: isAnimating ? 1 : 0, scale: isAnimating ? 1 : 0.5 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
    }}
  >
    <DescriptionIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
  </motion.div>
);

const MyTrips = () => {
  const navigate = useNavigate();
  const [showBag, setShowBag] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [showDocAnimation, setShowDocAnimation] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);

  const handleAddItem = () => {
    setItemCount(prev => prev + 1);
    setShowDocAnimation(true);
    setTimeout(() => setShowDocAnimation(false), 500);
  };

  const handleBagClick = () => {
    navigate('/trip-bag');
  };

  const handleStudentSelect = (student) => {
    setSelectedStudents(prev => {
      const isSelected = prev.some(s => s.id === student.id);
      if (isSelected) {
        return prev.filter(s => s.id !== student.id);
      } else {
        return [...prev, student];
      }
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TripCard
              title="צור טיול חדש"
              onAdd={() => setShowParticipants(true)}
              isMainCard
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TripCard
              title="הטיולים שלי"
              onAdd={() => navigate('/my-trips')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TripCard
              title="תבניות טיולים"
              onAdd={() => navigate('/trip-templates')}
            />
          </Grid>
        </Grid>

        {showParticipants && (
          <ParticipantsList
            open={showParticipants}
            onClose={() => setShowParticipants(false)}
            selectedStudents={selectedStudents}
            onStudentSelect={handleStudentSelect}
          />
        )}
      </Container>

      <TripBag
        visible={showBag}
        itemCount={itemCount}
        onBagClick={handleBagClick}
      />

      <DocumentAnimation isAnimating={showDocAnimation} />
    </Box>
  );
};

export default MyTrips;