import axios from 'axios';
import { toastError, toastInformLimitReached } from '../components/Toast';
import { ACCESS_TOKEN } from '../constants/envVar';
const SPEECH_RECOGNIZATION_URL = process.env.REACT_APP_SPEECH_RECOGNIZATION_URL;

const queryString = require('query-string');


const axiosDefault = axios.create({
	// baseURL: 'http://nmtuet.ddns.net:1710/',
	baseURL: SPEECH_RECOGNIZATION_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

const axios2 = axios.create({
	// baseURL: 'http://nmtuet.ddns.net:1710/',
	baseURL: SPEECH_RECOGNIZATION_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

axiosDefault.interceptors.request.use(
	async config => {
		const acc_token = localStorage.getItem(ACCESS_TOKEN);
		if (acc_token) {
			config.headers.Authorization = `${acc_token}`;
		}
		return config;
	},
	// error => Promise.reject(error),
);

axios2.interceptors.request.use(
	async config => {
		const acc_token = localStorage.getItem(ACCESS_TOKEN);
		if (acc_token) {
			config.headers.Authorization = `${acc_token}`;
		}
		return config;
	},
	// error => Promise.reject(error),
);


// Add a response interceptor
axiosDefault.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, function (error) {
	if (error.response.data.message) {
		if (error.response.data.message !== 'text_translate_limit_reached' && error.response.data.message !== 'audio_translate_limit_reached') {
			toastError(error.response.data.message);
		}
	}	
	return Promise.reject(error);
});

export const translateFileAudio = (body) => {
	return new Promise((resolve) => {
		axiosDefault({
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			baseURL: SPEECH_RECOGNIZATION_URL,
			timeout: 30000,
			method: 'POST',
			url: 'translate-speech',
			data: body,
			// body: body,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				if (error.response.data.message == 'audio_translate_limit_reached') {
					const { used, quota } = error.response.data.data;
					const { message } = error.response.data;
					toastInformLimitReached(message, used, quota, 'audio');
				}
				resolve('fail');
			});
	});
};


export const getSpeechRecogntionHistoryGetSingle = (params) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			baseURL: SPEECH_RECOGNIZATION_URL,
			timeout: 30000,
			method: 'GET',
			url: 'speech-recognition-history/get-single',
			params,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getTranslateResultBeta = (resultUrl) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			baseURL: SPEECH_RECOGNIZATION_URL,
			timeout: 30000,
			url: resultUrl,
			method: 'GET',
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};


export const SignInWithGoogle = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('user/auth', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const SignIn = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('user/login', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const CreateUserByAdmin = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('admin/user', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateUserQuota = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.put('admin/user/update_quota', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const downloadFile = (url, file_type) => {
	axios({
		url: SPEECH_RECOGNIZATION_URL + url,
		method: 'GET',
		responseType: 'blob', // important
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		const file_name = file_type == 'txt' ? 'file.txt' : 'file.docx';
		link.href = url;
		link.setAttribute('download', file_name);
		document.body.appendChild(link);
		link.click();
	});
};

export const downloadSpeechRecognitionResultFile = (url) => {
	axios({
		url: SPEECH_RECOGNIZATION_URL + url,
		method: 'GET',
		responseType: 'blob', // important
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'file.txt');
		document.body.appendChild(link);
		link.click();
	});
};

export const getConvertedText = (url) => {
	const res = axios({
		url: SPEECH_RECOGNIZATION_URL + url,
		method: 'GET',
		responseType: 'text', // important
	}).then((response) => {
		return response.data;
	});

	return res;
};

export const SignOut = () => {
	return new Promise((resolve, reject) => {
		axios2.post('user/logout')
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getMe = () => {
	return new Promise((resolve, reject) => {
		axios2.get('user/me')
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getUser = (id) => {
	return new Promise((resolve, reject) => {
		axiosDefault.get('user', { params: { id } })
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getUserList = (params) => {
	const _params = queryString.stringify(params);
	return new Promise((resolve, reject) => {
		axiosDefault.get('user/search', { params: _params })
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateUser = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.put('user/other', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const RefreshToken = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('user/auth', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const translateFile = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			method: 'POST',
			url: 'translate_f',
			data: body,
			// body: body,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				if (error.response.data.message == 'text_translate_limit_reached') {
					const { used, quota } = error.response.data.data;
					const { message } = error.response.data;
					toastInformLimitReached(message, used, quota, 'text');
				}
				else toastError('unexpected_document_translate_error');
				reject(error);
			});
	});
};

// sample data
// { "sourceText": "string", "sourceLang": "zh", "targetLang": "zh"
export const postTranslate = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('translate', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				if (error.response.data.message == 'text_translate_limit_reached') {
					const { used, quota } = error.response.data.data;
					const { message } = error.response.data;
					toastInformLimitReached(message, used, quota, 'text');
				}
				else toastError('unexpected_audio_translate_error');
				reject(error);
			});
	});
};

// sample data
// { "translationHistoryId": "string", "taskId": "string",
export const getTranslateHistoryGetSingle = (params) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			method: 'GET',
			url: 'translation-history/get-single',
			params,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// sample data
// { "translationHistoryId": "string", "taskId": "string",
export const getDetectionHistoryGetSingle = (params) => {
	return new Promise((resolve, reject) => {
		axiosDefault.get('lang-detection-history/get-single', {
			params
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// sample data
// { "sourceTexr": "string",
export const detectLangInstant = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('detect-lang', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// sample data
export const getTranslateResult = (resultUrl) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			url: resultUrl,
			method: 'GET',
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getTranslateHistory = (params) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			url: 'translation-history',
			method: 'GET',
			params,
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// -------------- API từ dưới xuống là của http://nmtuet.ddns.net:1710/ ------------- //

// sample data
// {"data":"年我国利用外","direction":"zh-vi"}
// eslint-disable-next-line no-unused-vars
export const createTranslation = (data) => {
	return new Promise((resolve, reject) => {
		axiosDefault
			.post('translate_paragraphs', data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				// console.warn('axios helper', error);
				reject(error);
			});
	});
};

/**
   * @description Call api nhận dạng ngôn ngũ
   * @input {
   * 			data: string
   * 		}
   * @output {lang: string, lang_str: string, status: boolean}
   */
export const detectLang = (data) => {
	return new Promise((resolve, reject) => {
		axiosDefault
			.post('detect_lang', data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				// console.warn('axios helper', error);
				reject(error);
			});
	});
};
