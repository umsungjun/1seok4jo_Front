import React, { useState, useEffect, useRef } from "react";
import API from "../../../../config";
import Image from "next/image";
import ratingStar from "../../../../public/goods/ratingStar.svg";
import yellowStar from "../../../../public/goods/yellowStar.svg";
import smallArrowUp from "../../../../public/goods/smallArrowUp.svg";
import smallArrowDown from "../../../../public/goods/smallArrowDown.svg";
import greyArrowBoth from "../../../../public/goods/greyArrowBoth.svg";
import redArrowDown from "../../../../public/goods/redArrowDown.svg";
import redArrowUp from "../../../../public/goods/redArrowUp.svg";
import redCheckbox from "../../../../public/login/redCheckbox.svg";
import SimplePageHeader from "../../../../components/common/SimplePageHeader";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStore } from "../../../../store";

const AllReview = () => {
  const router = useRouter();
  const [goodsData, setGoodsData] = useState();

  const [isRatingHighest, setIsRatingHighest] = useState(false);
  const [isRatingLowest, setIsRatingLowest] = useState(false);
  const [isRatingRecent, setIsRatingRecent] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [reviewPagination, setReviewPagination] = useState([]);
  const [review_response, setReview_Response] = useState([]);
  const [review_rating, setReview_Rating] = useState([]);
  const [date, setDate] = useState("");
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [isExpandClicked, setIsExpandClicked] = useState([]);
  const { id } = router.query;
  const [sortFlg, setSortFlg] = useState("current");
  const [isLoading, setIsLoading] = useState(false);
  const goods_id = id;
  let page = 0;

  let temp = [];

  const onScroll = () => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      // body.scrollHeight
      // body.offsetHeight
      html.clientHeight
      // html.scrollHeight
      // html.offsetHeight
    );
    // console.log("1", body.scrollHeight);

    // console.log("4", document.body.scrollTop + body.offsetHeight);

    if (document.body.scrollTop + body.offsetHeight + 1 >= body.scrollHeight) {
      page++;
      if (page < 0) {
        return;
      } else if (page == 1) {
        setIsLoading(true);
      } else {
        fetchReview(page);
      }
    }
  };

  useEffect(() => {
    if (goods_id) {
      fetch(
        `${
          API.getReviewList
        }${goods_id}&sort_flg=${sortFlg}&photo_review=${isCheckboxClicked}&device_kind=${document.cookie
          .split("device=")[1]
          ?.split(" ")[0]
          .replace(";", "")}&app_version=${API.app_version}&page=${0}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            Authorization: ``,
            identityKey: document.cookie
              .split("identity-key=")[1]
              ?.split(" ")[0]
              .replace(";", ""),
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("RESSS", res);
          setReviewData(res.data);
          setReview_Rating(res.data.rating_count);
          setReviewPagination(res.pagination);
          temp = [...res.data.review_response_dto_list];
          setReview_Response(temp);
          // setRatingCount(res.data.rating_count);
          setDate(res.data.review_response_dto_list.updated_at);
        });
    }
    document.body.addEventListener("scroll", onScroll);

    return () => document.body.removeEventListener("scroll", onScroll);
  }, [sortFlg, id, isCheckboxClicked]);

  const fetchReview = (page) => {
    const setTime = setTimeout(fetcher, 1000);
    function fetcher() {
      fetch(
        `${
          API.getReviewList
        }${goods_id}&sort_flg=${sortFlg}&photo_review=${isCheckboxClicked}&device_kind=${document.cookie
          .split("device=")[1]
          ?.split(" ")[0]
          .replace(";", "")}&app_version=${API.app_version}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            Authorization: ``,
            identityKey: document.cookie
              .split("identity-key=")[1]
              ?.split(" ")[0]
              .replace(";", ""),
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.data.review_response_dto_list.length !== 0) {
            temp = [...temp];
            temp.push(...res.data.review_response_dto_list);
            setReview_Response(temp);
            setIsLoading(true);
          } else {
            setIsLoading(false);
          }
        });
    }
  };

  const mostRecentReviewClicked = () => {
    setSortFlg("current");
    setIsRatingRecent(true);
    setIsRatingHighest(false);
    setIsRatingLowest(false);
  };

  const highestRatingClicked = () => {
    setSortFlg("high");
    setIsRatingHighest(true);
    setIsRatingLowest(false);
    setIsRatingRecent(false);
  };

  const LowestRatingClicked = () => {
    setSortFlg("low");
    setIsRatingLowest(true);
    setIsRatingHighest(false);
    setIsRatingRecent(false);
  };

  const handleCheckBox = () => {
    setIsCheckboxClicked(!isCheckboxClicked);
  };

  const toggleSingleText = (key) => {
    let newArr = [...isExpandClicked];
    if (newArr[key] === undefined) {
      newArr[key] = true;
    } else {
      newArr[key] = !newArr[key];
    }

    setIsExpandClicked(newArr);
  };

  const toggleViewImages = (images) => {
    useStore.setState({
      reviewImages: images,
    });
  };
  const dateData = date?.split("T")[0];
  console.log("REEEW@WVW", reviewData);
  return (
    <>
      {goods_id && (
        <SimplePageHeader
          pageTitle="리뷰"
          borderBottom={true}
          goods_id={goods_id}
          isReview={true}
          review_count={reviewPagination.total_elements}
          headerReferer="goback"
        />
      )}

      <main className="review-box max-width">
        <div className="category-box-view-all">
          <div className="row justify-between">
            <div className="row">
              <div className="rating-category-box row align-center">
                {isRatingRecent ? (
                  <span className="B12 black-80 border-right">최신순</span>
                ) : (
                  <span
                    className="R12 black-30 border-right"
                    onClick={() => mostRecentReviewClicked()}
                  >
                    최신순
                  </span>
                )}
                {isRatingRecent ? (
                  <span
                    className="R12 black-30 margin-left link row align-center"
                    onClick={() => highestRatingClicked()}
                  >
                    별점높은순
                    <span className="red-arrow">
                      <Image src={greyArrowBoth} />
                    </span>
                  </span>
                ) : isRatingHighest ? (
                  <span
                    className="B12 black-80 margin-left link row align-center"
                    onClick={() => LowestRatingClicked()}
                  >
                    별점높은순
                    <span className="red-arrow">
                      <Image src={redArrowUp} />
                    </span>
                  </span>
                ) : (
                  <span
                    className="B12 black-80 margin-left link row align-center"
                    onClick={() => highestRatingClicked()}
                  >
                    별점낮은순
                    <span className="red-arrow">
                      <Image src={redArrowDown} />
                    </span>
                  </span>
                )}
              </div>
            </div>
            <div className="checkbox row justify-between">
              <span onClick={() => handleCheckBox()}>
                {isCheckboxClicked ? (
                  <div className="red-check-box link">
                    <Image src={redCheckbox} />
                  </div>
                ) : (
                  <div className="empty-checkbox link"></div>
                )}
              </span>
              <span className="R12 checkbox-text">포토리뷰</span>
            </div>
          </div>
        </div>
        <div>
          {review_response &&
            review_response.map((rev, idx) => {
              const dateData = rev?.updated_at.split("T")[0];
              const year = dateData?.replace("-", ". ");
              const month = year?.replace("-", ". ");
              console.log("RRWAAA", rev);

              return (
                <div className="single-review" key={idx}>
                  {rev?.review_rating === 1 ? (
                    <div className="rating-stars">
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  ) : rev?.review_rating === 2 ? (
                    <div className="rating-stars">
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  ) : rev?.review_rating === 3 ? (
                    <div className="rating-stars">
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  ) : rev?.review_rating === 4 ? (
                    <div className="rating-stars">
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  ) : rev?.review_rating === 5 ? (
                    <div className="rating-stars">
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span>
                        <Image src={yellowStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  ) : (
                    <div className="rating-stars">
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span>
                        <Image src={ratingStar} />
                      </span>
                      <span className="M13 black-80 review-writer">
                        {rev?.member_s_id}
                      </span>
                      <span className="date">{month}</span>
                    </div>
                  )}
                  <div
                    className={
                      rev?.review_images == null ? "" : "image-slide-box row"
                    }
                  >
                    {rev?.review_images?.map((datum, i) => {
                      console.log("REEVVV", rev);
                      return (
                        <div key={i}>
                          {datum?.length > 0 ? (
                            <Link
                              href={`/goods-detail/${rev?.display_goods_id}/images`}
                            >
                              <a target="_blank">
                                <img
                                  className="image-slide link"
                                  src={`${datum}`}
                                  onClick={() =>
                                    toggleViewImages(rev?.review_images)
                                  }
                                />
                              </a>
                            </Link>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  <div className="review-text-wrapper">
                    <div className="review-text-box">
                      <span
                        className={
                          isExpandClicked[idx]
                            ? "R12 review-text-expand"
                            : "R12 review-text"
                        }
                      >
                        {rev?.review_text}
                      </span>
                      <span>{idx}</span>
                    </div>
                    <span
                      className="arrow-down"
                      onClick={() => toggleSingleText(idx)}
                      value={rev?.id}
                    >
                      <Image
                        src={
                          isExpandClicked[idx] ? smallArrowUp : smallArrowDown
                        }
                      />
                    </span>
                  </div>
                  <p className="goods-text R12 black-30">
                    [{rev?.display_goods_name}]&nbsp;&nbsp;{rev?.goods_name}
                  </p>
                </div>
              );
            })}
          {isLoading == true ? (
            <section className="row justify-center p-top-10 p-bottom-10">
              <div className="donut"></div>
            </section>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default AllReview;