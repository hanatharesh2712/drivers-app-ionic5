/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
export const environment = {
  production: true,
  RUN_ENVIRONMENT: 'prod',
  COUNTRY: 'US',
  config: {
    apiKey: 'AIzaSyBl8L44muSYUO9QWFL_f_23kcMdXBdxta0',
    authDomain: 'taxi-platform-cdf9d.firebaseapp.com',
    databaseURL: 'https://taxi-platform-cdf9d.firebaseio.com',
    projectId: 'taxi-platform-cdf9d',
    storageBucket: 'taxi-platform-cdf9d.appspot.com',
    messagingSenderId: '214474905314',
    appId: '1:214474905314:web:0364de4cdad898ecf2f0bb',
    measurementId: 'G-S12H8PS6ZK'
  },
  appUrl: 'https://dispatch-api.moveo.net/api/drivers/',
  partnersAppUrl: 'https://dispatch-api.moveo.net/api/partners/',
  loginUrl: 'https://dispatch-api.moveo.net/oauth/token',
  storageUrl: 'https://dispatch-api.moveo.net/storage/',
  noLoginUrl: 'https://dispatch-api.moveo.net/',
  configs: {

  },
  drvnSupportNumber: '305-967-7474',
  versionCheckURL : 'https://vip.moveo.net/version.json',
  GOOGLE_MAPS_API_KEY: 'AIzaSyBzPIxztJQWfQR_Ekxsv08SljGTpYItr_Y',
  giveBackHoursLimit: 24,
  API_URLS: {
    dev: 'http://192.168.1.2:3000',
    prod: '',
  },

  DEFAULT_LAT: 51.5,
  DEFAULT_LNG: 0.0,
  TRIP_PAYMENTS: [
    { title: 'Paid amount', pay: '$25' },
    { title: 'Apple Pay', pay: '$15' },
    { title: 'Discount', pay: '$10' },
  ],
  VEHICLE_DATA: [
    {
      label: 'Vehicle Brand',
      placeholder: 'Select Vehicle',
      data: [
        {
          name: 'Toyota',
        },
        {
          name: 'Mercedes-Benz',
        },
        {
          name: 'Audii',
        },
        {
          name: 'Maruti',
        },
        {
          name: 'Scoda',
        },
        {
          name: 'Wolgswagon',
        },
        {
          name: 'Innova',
        },
        {
          name: 'Alto K10',
        },
        {
          name: 'Swift Desire',
        },
        {
          name: 'Bugatti Veyron',
        },
      ],
    },
    {
      label: 'Model',
      placeholder: 'Select Model',
      data: [
        {
          name: 'Camry',
        },
        {
          name: 'Suv',
        },
        {
          name: 'XUv',
        },
        {
          name: 'Sedan',
        },
      ],
    },
    {
      label: 'Year',
      placeholder: 'Select Year',
      data: [
        {
          name: '2000',
        },
        {
          name: '2001',
        },
        {
          name: '2002',
        },
        {
          name: '2003',
        },
        {
          name: '2004',
        },
        {
          name: '2005',
        },
        {
          name: '2006',
        },
        {
          name: '2007',
        },
        {
          name: '2008',
        },
        {
          name: '2009',
        },
        {
          name: '2010',
        },
        {
          name: '20011',
        },
        {
          name: '20012',
        },
        {
          name: '20013',
        },
        {
          name: '20014',
        },
        {
          name: '20015',
        },
        {
          name: '20016',
        },
        {
          name: '20017',
        },
        {
          name: '20018',
        },
      ],
    },
    {
      label: 'color',
      placeholder: 'Select color',
      data: [
        {
          name: 'Black',
        },
        {
          name: 'Yellow',
        },
        {
          name: 'Red',
        },
        {
          name: 'White',
        },
      ],
    },
    {
      label: 'Booking Type',
      placeholder: 'Select Booking Type',
      data: [
        {
          name: 'Taxi 7 seat',
        },
        {
          name: 'Taxi 9 seat',
        },
        {
          name: 'Cab 4 seat',
        },
        {
          name: 'Auto-Rikshaw',
        },
        {
          name: 'E-Rikshaw',
        },
      ],
    },
  ],
  CONTACT_US_LIST: [
    {
      title: 'https://store.enappd.com/',
      imageUrl: 'assets/enappd-logo-BLUE.png',
      titleUrl: 'https://store.enappd.com/',
      color: '#000',
    },
    {
      title: 'support@enappd.com',
      iconUrl: 'mail',
      color: '#dd4b39',
    },
    {
      title: '+91-820 931 3520',
      iconUrl: 'call',
      color: '#000',
    },
    {
      title: '/EnappdStore',
      iconUrl: 'logo-facebook',
      titleUrl: 'https://m.facebook.com/EnappdStore/',
      color: '#3C5A99',
    },
    {
      title: '/Enappd',
      iconUrl: 'logo-instagram',
      titleUrl: 'https://www.instagram.com/Enappd/',
      color: '#e4405f',
    },
  ],
  CARDS_DATA: [
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/user1.jpeg',
      button1: 'ApplePay',
      button2: 'Discount',
      km: '7.2 km',
      pickup: '7958 Swift Village',
      drop: '105 William St,Chicago,US',
      noted: 'Lorem, ipsum dolor sit amet consectetur',
      applePay: '$15.00',
      discount: '$25.00',
      paidamount: '$07.00',
    },
  ],
  SAMPLE_CHAT: [
    {
      userId: 'Me',
      userName: 'Me',
      userAvatar: 'assets/driver.jpeg',
      time: '12:01 pm',
      message: 'Hello, are you nearby?',
    },
    {
      userId: 'Driver',
      userName: 'Driver',
      userAvatar: 'assets/user.jpeg',
      time: '12:01 pm',
      message: 'i\'ll be there in few a mins',
    },
    {
      userId: 'Me',
      userName: 'Me',
      userAvatar: 'assets/driver.jpeg',
      time: '12:01 pm',
      message: 'Ok i am waiting..',
    },
    {
      userId: 'Driver',
      userName: 'Driver',
      userAvatar: 'assets/user.jpeg',
      time: '12:01 pm',
      message: 'Sorry i am stuck in traffic Please give me a moment',
    },
  ],
  DRIVER_CANCEL_MSG: 'Are you sure you want to cancel this request ?',
  USER_REJECTED_MSG: 'User has canceled the Ride',
  USER_REQUESTS: [
    {
      userName: 'John Deo',
      userImage: 'assets/user.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$25',
      distance: 2.2,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false,
    },
    {
      userName: 'Esther Berry',
      userImage: 'assets/user3.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$35',
      distance: 3,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false,
    },
    {
      userName: 'Esther Berry',
      userImage: 'assets/user1.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$50',
      distance: 5,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false,
    },
    {
      userName: 'Johnny Deo',
      userImage: 'assets/user3.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$60',
      distance: 6,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false,
    },
    {
      userName: 'Zach Deo',
      userImage: 'assets/user2.jpeg',
      paymentType: 'Apple pay',
      coupon: 'Discount',
      price: '$30',
      distance: 3.1,
      pickupLocation: '7958 Swift Village',
      dropOffLocation: '105 William, US',
      checked: false,
    },
  ],
  DRIVER_DOC_LIST: [
    {
      name: 'Identification Card',
      icon: 'person',
      url: '/drivinglicense',
    },
    {
      name: 'Driving License',
      icon: 'person',
      url: '/drivinglicense',
    },
  ],
  MAP_STYLE: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ],
  RENDER_OPTIONS: {
    suppressMarkers: true,
  },
  DIRECTION_OPTIONS: {
    origin: {
      icon: 'assets/Google-Car.png',
    },
    destination: {
      icon: 'assets/distinationsMaker.png',
      opacity: 0.8,
    },
  },
  FRIEND_LIST: [
    {
      name: 'Elva Barnet',
      image: 'assets/img/user1.jpeg',
      button1: '5 mutual friends',
    },
    {
      name: 'Andre Clark',
      image: 'assets/img/user2.jpeg',
      button1: '5 mutual friends',
    },
    {
      name: 'Elva Barnet',
      image: 'assets/img/user3.jpeg',
      button1: '5 mutual friends',
    },
    {
      name: 'Elva Barnet',
      image: 'assets/img/user1.jpeg',
      button1: '5 mutual friends',
    },
    {
      name: 'Elva Barnet',
      image: 'assets/img/user2.jpeg',
      button1: '5 mutual friends',
    },
    {
      name: 'Andre Clark',
      image: 'assets/img/user3.jpeg',
      button1: '5 mutual friends',
    },
  ],
  SAMPLE_NOTIFICATIONS: [
    {
      title: 'system',
      subtitle: 'Booking #1234 Successful...',
      iconUrl: 'assets/success.png',
    },
    {
      title: 'Promotion',
      subtitle: 'invite friend - Get 3 coupon each',
      iconUrl: 'assets/coupon.png',
    },
    {
      title: 'Promotion',
      subtitle: 'invite friend - Get 3 coupon each',
      iconUrl: 'assets/coupon.png',
    },
    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: 'assets/error.png',
    },
    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: 'assets/success.png',
    },
  ],
  PAYMENT_METHODS: [
    {
      type: 'VISA',
      amount: '************3765',
      image: 'assets/img/visa.png',
    },
    {
      type: 'Paypal',
      amount: '************3765',
      image: 'assets/img/paypal.png',
    },
    {
      type: 'Master Card',
      amount: '************3765',
      image: 'assets/img/mastercard.png',
    },
    {
      type: 'Paytm',
      amount: '************3765',
      image: 'assets/img/dollar.png',
    },
    {
      type: 'Cash',
      amount: '************3765',
      image: 'assets/img/paypal.png',
    },
  ],
  DRIVER_DOCUMENT_SETTINGS: [
    {
      icon: 'car',
      title: 'Vehicle Management',
      background: '#FF9600',
      page: 'vehiclemanagement',
    },
    {
      icon: 'document',
      title: 'Document Management',
      background: '#A1EBAE',
      page: 'documentmanagement',
    },
    { icon: 'star', title: ' Review Management', background: '#FFD114' },
    {
      image: 'assets/worldwide1.png',
      title: 'Language',
      background: '#007BFF',
    },
  ],
  OTHER_SETTINGS: [
    {
      icon: 'notifications',
      title: 'Notifications',
      background: '#59CAFA',
      page: 'notifications',
    },
    {
      image: 'assets/crown.png',
      title: 'Terms and Privacy Policy',
      background: '#908F95',
      page: 'terms-condictions',
    },
    {
      icon: 'help-circle-outline',
      title: 'Contact Us',
      background: '#FF2954',
      page: 'contact-us',
    },
  ],
  VEHICLE_LIST: [
    {
      name: 'Madza',
      car_no: '43A 235 70',
      icon: 'paper',
    },
    {
      name: 'Mitshubishi Outlander',
      car_no: '43A 125 70',
      icon: 'paper',
    },
  ],
  WALLET_DATA: [
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
    {
      name: 'Elva Barnet',
      amount: '$22.50',
      image: 'assets/img/dollar.png',
    },
  ],
};
