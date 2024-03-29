import { Injectable } from '@angular/core';
import { InvalidTokenError } from './model/invalid-token-error.model';

@Injectable({ providedIn: 'root' })
export class JwtDecodeService {
    decode<TTokenDto>(token: string): TTokenDto {
        if (typeof token !== 'string') {
            throw new InvalidTokenError('Invalid token specified');
        }
        try {
            return JSON.parse(this.base64_url_decode(token.split('.')[1]));
        } catch (e: unknown | {name:string}) {
            if(this.isError(e)) {
                throw new InvalidTokenError('Invalid token specified: ' + e.message);
            } else {
                throw new InvalidTokenError('Invalid token specified');
            }
        }
    }

    isError(obj: unknown): obj is {message: string} {
        return (
          typeof obj === 'object' && obj !== null && 'message' in obj
        );
      }

    b64DecodeUnicode(str: string) {
        return decodeURIComponent(
            atob(str).replace(/(.)/g, (m, p) => {
                let code = p.charCodeAt(0).toString(16).toUpperCase();
                if (code.length < 2) {
                    code = '0' + code;
                }
                return '%' + code;
            }),
        );
    }

    base64_url_decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw new InvalidTokenError('Illegal base64url string!');
        }

        try {
            return this.b64DecodeUnicode(output);
        } catch (err) {
            return atob(output);
        }
    }
}
