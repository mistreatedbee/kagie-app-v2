export const mockListings = [
{
  id: '1',
  name: 'The Apex Student Living',
  location: 'Braamfontein, Johannesburg',
  distance: 0.5,
  price: 4500,
  rating: 4.8,
  reviewsCount: 124,
  image:
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  amenities: ['Wifi', 'Gym', 'Laundry', 'Security'],
  available: true,
  type: 'Private Apartment',
  host: {
    name: 'CampusKey',
    verified: true,
    avatar:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
},
{
  id: '2',
  name: 'Varsity Studios',
  location: 'Rondebosch, Cape Town',
  distance: 1.2,
  price: 5200,
  rating: 4.5,
  reviewsCount: 89,
  image:
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  amenities: ['Wifi', 'Study Room', 'Security'],
  available: true,
  type: 'Studio',
  host: {
    name: 'StudentLife',
    verified: true,
    avatar:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
},
{
  id: '3',
  name: 'Greenway Res',
  location: 'Hatfield, Pretoria',
  distance: 0.8,
  price: 3800,
  rating: 4.2,
  reviewsCount: 56,
  image:
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  amenities: ['Wifi', 'Pool', 'Laundry'],
  available: false,
  type: 'Shared Room',
  host: {
    name: 'Respublica',
    verified: false,
    avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
},
{
  id: '4',
  name: 'Urban Loft',
  location: 'Observatory, Cape Town',
  distance: 2.5,
  price: 6500,
  rating: 4.9,
  reviewsCount: 210,
  image:
  'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  amenities: ['Wifi', 'Gym', 'Balcony', 'Security', 'Parking'],
  available: true,
  type: 'Private Apartment',
  host: {
    name: 'Urban Living',
    verified: true,
    avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}];


export const mockUser = {
  name: 'Alex Johnson',
  avatar:
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  institution: 'University of Cape Town',
  activeBooking: {
    listingName: 'Varsity Studios',
    status: 'Confirmed',
    moveInDate: '2024-02-01',
    image:
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
};