import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"cursoangular-6ee11","appId":"1:210511153591:web:cde1f0d9a177adf4708032","storageBucket":"cursoangular-6ee11.firebasestorage.app","apiKey":"AIzaSyAU9xlUakMIwTS4CWC7kEvqkNY9mWzzBeQ","authDomain":"cursoangular-6ee11.firebaseapp.com","messagingSenderId":"210511153591"})), provideAuth(() => getAuth())]
};
