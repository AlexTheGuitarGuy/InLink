import s from './Contacts.module.css';
import React from 'react';

const Contacts = ({ contacts }) => {
  let redirect = (link) => {
    alert(link);
  };

  let isEmpty = true;
  let i;
  for (i in contacts)
    if (contacts.hasOwnProperty(i)) {
      if (contacts[i]) {
        isEmpty = false;
        break;
      }
    }

  let {
    facebook,
    vk,
    twitter,
    instagram,
    youtube,
    github,
    website,
    mainLink,
  } = contacts;

  return (
    <div className={s.contacts}>
      Contacts:
      {(!isEmpty && (
        <div>
          <span className={s.contactImages}>
            {facebook && (
              <img
                src="https://pnggrid.com/wp-content/uploads/2021/05/Facebook-logo-2021.png"
                alt="facebook"
                onClick={() => {
                  redirect(facebook);
                }}
              />
            )}

            {vk && (
              <img
                src="https://freepikpsd.com/file/2019/10/vk-logo-png-7-Transparent-Images.png"
                alt="vk"
                onClick={() => {
                  redirect(vk);
                }}
              />
            )}

            {twitter && (
              <img
                src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png"
                alt="twitter"
                onClick={() => {
                  redirect(twitter);
                }}
              />
            )}

            {instagram && (
              <img
                src="https://straightarrowfilms.com/wp-content/uploads/2020/05/new-instagram-logo-png-transparent-light.png"
                alt="instagram"
                onClick={() => {
                  redirect(instagram);
                }}
              />
            )}

            {youtube && (
              <img
                src="https://www.designbust.com/download/1005/png/transparent_background_youtube_logo_png512.png"
                alt="youtube"
                onClick={() => {
                  redirect(youtube);
                }}
              />
            )}

            {github && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="github"
                onClick={() => {
                  redirect(github);
                }}
              />
            )}
          </span>
          {website && (
            <div
              onClick={() => {
                redirect(website);
              }}
            >
              website
            </div>
          )}
          {mainLink && (
            <div
              onClick={() => {
                redirect(mainLink);
              }}
            >
              main link
            </div>
          )}
        </div>
      )) || <div>None</div>}
    </div>
  );
};

export default Contacts;
