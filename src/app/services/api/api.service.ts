import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AuthenticationService } from './firebase-authentication.service';
import { Ride } from '@app/models/ride';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private id;

  constructor(
    private http: HttpClient,
    private firestore: FirestoreService,
    private auth: AuthenticationService
  ) { }

  updateToken(id) {
    this.id = id;
  }

  signUp(user): Observable<any> {
    const userInfo = {
      'id': null,
      'username': user['email'],
      'email': user['email'],
      'name': user['name'],
      'approved': false,
      'available': false
    };

    return new Observable((observer) => {
      this.auth.createAccount(user['email'], user['password'])
        .then(user => {
          console.log(user);
          userInfo.id = user.uid;
          this.firestore.createWithId('drivers', userInfo).then(usr => {
            console.log(usr);
            observer.next(userInfo);
          }, err => {
            observer.error(err);
          });
        }).catch(err => {
          observer.error(err);
        });
    });

  }

  logIn(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.auth.login(username, password)
        .then(user => {
          observer.next({ id: user.uid });
        }).catch(err => {
          observer.error(err);
        });
    });

  }

  logout() {
    return this.auth.logout();
  }

  getDriver(): Observable<any> {
    return this.addIdToObject(this.id, this.firestore.getOne('drivers', this.id));
  }


  acceptRide(rideId, driverId): Observable<any> {
    return new Observable((observer) => {
      this.getRide(rideId).subscribe(ride => {
        console.log(ride);
        if (!ride['request_timeout']) {
          this.updateRideData(rideId, { ride_accepted: true, driverId })
            .subscribe(res => {
              observer.next({ message: [1] });
            }, err => {
              observer.next({ message: [0] });
            });
        } else {
          observer.next({ message: [0] });
        }
      }, err => {
        observer.error(err);
      });
    });
  }

  cancelRide(rideId): Observable<any> {
    return this.updateRideData(rideId, { driver_rejected: true, driverId: null });
  }

  startRide(rideId): Observable<any> {
    return new Observable((observer) => {
      this.getRide(rideId).subscribe(ride => {
        console.log(ride);
        if (!ride['user_rejected']) {
          this.updateRideData(rideId, { ride_started: true })
            .subscribe(res => {
              observer.next({ message: [1] });
            }, err => {
              observer.next({ message: [0] });
            });
        } else {
          observer.next({ message: [0] });
        }
      }, err => {
        observer.error(err);
      });
    });
  }

  completeRide(rideId): Observable<any> {
    return this.updateRideData(rideId, { ride_completed: true });
  }

  getRideHistory(driverId): Observable<any> {
    return this.firestore.find('rides', ref => ref.where('driverId', '==', driverId));
  }

  updateDriverData(id, driverData): Observable<any> {
    return from(this.firestore.update('drivers', id, driverData));
  }

  updateRideData(rideId, data): Observable<any> {
    return from(this.firestore.update('rides', rideId, data));
  }

  rideCheck(): Observable<any> {
    return this.firestore.findOne('rides', ref => ref
      .where('driverId', '==', null)
      .where('user_rejected', '==', false)
      .where('driver_rejected', '==', false)
      .where('ride_completed', '==', false)
      .where('ride_started', '==', false)
      .where('request_timeout', '==', false)
      .where('ride_accepted', '==', false).orderBy('createdAt', 'desc').limit(1));  // TODO
  }

  getRideUser(userId): Observable<any> {
    return this.addIdToObject(userId, this.firestore.getOne('clients', userId));
  }

  getTodayRideStats(driverId): Observable<any> {
    return new Observable((observer) => {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setMilliseconds(0);
      today.setSeconds(0);

      this.firestore.find('rides', ref => ref
        .where('driverId', '==', driverId)
        .where('createdAt', '>', today))
        .subscribe((rides: any) => {
          console.log(rides);
          if (rides.length) {
            const totalRides = rides.length;
            const totalFare = rides.reduce((sum, ride) => ride.fare + sum, 0);
            const totalDistance = rides.reduce((sum, ride) => ride.distance + sum, 0);
            const hoursOnline = ((Number(new Date()) - rides[0].createdAt.toDate()) / 3600000).toFixed(2);
            observer.next({ totalRides, totalFare, totalDistance, hoursOnline });
          } else {
            observer.next({ totalRides: 0, totalFare: 0, totalDistance: 0, hoursOnline: 0 });
          }

        }, err => {
          observer.error(err);
        });
    });
  }

  getRide(rideId): Observable<any> {
    return this.addIdToObject(rideId, this.firestore.getOne('rides', rideId));
  }

  snapshotToDataConverter(query: Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>) {
    return new Observable((observer) => {
      query
        .then(ref => {
          const obj = ref.data();
          obj.id = ref.id;
          observer.next(obj);
        }).catch(err => {
          observer.error(err);
        });
    });
  }

  addIdToObject(id, obj: Observable<any>) {
    return new Observable((observer) => {
      if (id) {
        obj.subscribe(ref => {
          const newObj = ref;
          if (newObj) {
            newObj.id = id;
          }
          observer.next(newObj);
        }, err => {
          observer.error(err);
        });
      } else {
        observer.error({ message: 'No ID' });
      }
    });
  }


}
