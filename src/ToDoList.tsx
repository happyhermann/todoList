/* eslint-disable react/jsx-props-no-spreading */

import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // eslint-disable-next-line no-console
//     if (toDo.length < 10) {
//       setToDoError('더 길게 써야해요');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button type="button">Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//       <div>
//         <li>할일 : {toDo}</li>
//       </div>
//     </div>
//   );
// }

type IFormData = {
  errors: {
    email: {
      message: string;
    };
  };
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string;
  CheckingPassword: string;
};

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: '@naver.com',
    },
    // 기본값 지정
  });
  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError('password1', { message: '비밀번호가 같지 않습니다' }, { shouldFocus: true });
      // shouldFocus : password 문제가 생기면 즉시 Fcous됨
    }
  };
  // validation 완료되면 불러지는 함수
  // register 함수가 기존의 form을 전부다 해결해줄 것
  // wacth 함수는 form의 입력값의 변화를 주시
  // handleSubmit Validation (+preventDefault()) 역할을 함
  // 이 함수안에는 onBlur, onChange, ref가 전부 다 있다.

  console.log(errors);
  // input 에러 감지

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
      <input
        {...register('email', {
          required: '이메일을 적어주세요',
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: '네이버 이메일만 가능합니다',
          },
        })}
        placeholder="Write a to do"
      />
      <span>{errors?.email?.message}</span>
      <input {...register('firstName', { required: '성을 적어주세요', minLength: 5 })} placeholder="First Name" />
      <span>{errors?.firstName?.message}</span>
      <input {...register('lastName', { required: '이름을 적어주세요', minLength: 5 })} placeholder="Last Name" />
      <span>{errors?.lastName?.message}</span>
      <input {...register('username', { required: '닉네임을 적어주세요' })} placeholder="UserName" />
      <span>{errors?.username?.message}</span>
      <input {...register('password', { required: '비밀번호를 적어주세요' })} placeholder="Password" />
      <span>{errors?.password?.message}</span>
      <input
        {...register('password1', {
          required: '비밀번호',
          minLength: {
            value: 5,
            message: '비밀번호가 너무 짧아요',
          },
        })}
        placeholder="Password1"
      />
      <span>{errors?.password1?.message}</span>

      {/* register 함수가 반환하는 객체를 가져다가 input에 props로 주는 것  */}
      <button type="submit">Add</button>
      {errors?.extraError?.message}
    </form>
  );
}

export default ToDoList;

