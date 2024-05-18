import React from 'react';
import { Helmet } from 'react-helmet';

function ProfileHead() {
  return (
    <Helmet>
      <style type="text/css">
        {`
          .turbo-progress-bar {
              position: fixed;
              display: block;
              top: 0;
              left: 0;
              height: 3px;
              background: #0076ff;
              z-index: 2147483647;
              transition:
                  width 300ms ease-out,
                  opacity 150ms 150ms ease-in;
              transform: translate3d(0, 0, 0);
          }
        `}
      </style>
      <title>kbin.social - Explore the Fediverse</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="kbin, link aggregator, mikroblog, socialmedia, wykop, reddit, twitter, open source, fediverse, makigi" />
      <meta name="description" content="Explore the Fediverse" />
      <meta property="og:url" content="https://kbin.social/" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="kbin.social - Explore the Fediverse" />
      <meta property="og:description" content="Explore the Fediverse" />
      <meta property="og:image" content="https://kbin.social/kbin-og.png" />
      <link rel="icon" href="Elements/favicon.ico" sizes="any" />
      <link rel="icon" href="Elements/favicon.svg" type="image/svg+xml" />
      <link rel="manifest" href="Elements/manifest.json" />
      <link rel="stylesheet" href="Css/824.b4cc3385.css" data-turbo-track="reload" />
      <link rel="stylesheet" href="Css/app.910c0aab.css" data-turbo-track="reload" />
      </Helmet>
  );
}

export default ProfileHead;
