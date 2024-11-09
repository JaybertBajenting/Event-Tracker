import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/Api';
import { useAuth } from '@/context/Auth';


interface EventHandlingProps {
    onEventChange?: () => void; // Declare the callback function
  }

export const EventHandling = ({ onEventChange }: EventHandlingProps = {}) => {
  const { user } = useAuth();  
  const [joinedEvents, setJoinedEvents] = useState<number[]>(() => {
    const storedEvents = localStorage.getItem('joinedEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const isEventJoined = (eventId: number) => joinedEvents.includes(eventId);
  
  useEffect(() => {
    localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
  }, [joinedEvents]);

  const joinOrWithdrawEvent = async (event_id: number) => {
    try {
      const isJoined = joinedEvents.includes(event_id);

      if (isJoined) {
        await axios.delete(API_ENDPOINTS.WITHDRAW_EVENT, {
          data: {
            studentId: user?.id,
            eventId: event_id,
          },
        });
        setJoinedEvents((prevJoinedEvents) =>
          prevJoinedEvents.filter((eventId) => eventId !== event_id)
        );
      } else {
        const response = await axios.post(API_ENDPOINTS.JOIN_EVENT, {
          studentId: user?.id,
          eventId: event_id,
        });
        setJoinedEvents((prevJoinedEvents) => [
          ...prevJoinedEvents,
          response.data.eventId,
        ]);
      } 
      if (onEventChange) {
        onEventChange();
      }
    } catch (error) {
      console.error("Error joining/unjoining event:", error);
    }
  };

  return {
    joinedEvents,
    isEventJoined,
    joinOrWithdrawEvent,
  };
};
