import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    tagTypes: ["Me", "Trips", "Budgets", "Meals", "Food", "Clothing", "Campgrounds", "Activities", "Equipment", "Users"],
    //me, trips, budgets, meals, food, clothing, campgrounds, activities, equipment, users

    endpoints: (builder) => ({
        //<---------------------------AUTHORIZATION--------------------------->
        //LOGIN ACCOUNT 
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["Me"]
        }),
        //LOGOUT ACCOUNT
        logout: builder.mutation({
            queryFn: () => ({
                data: {}
            }),
            invalidatesTags: ["Me"]
        }),
        //GET ALL USERS FOR VALIDATION
        getAllUsersValidation: builder.query({
            query: () => ({
                url: `/auth/users/validate`,
                method: 'GET',
            }),
        }),
        //<---------------------------GET USER INFO--------------------------->
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["Me"]
        }),
        //GET FOOD BY USER
        getUserFood: builder.query({
            query: (user) => ({
                url: `/api/food/food/${user}`,
                method: "GET",
            }),
            providesTags: ["Food"]
        }),
        //GET CLOTHING BY USER
        getUserClothing: builder.query({
            query: (user) => ({
                url: `/api/clothing/${user}`,
                method: "GET",
            }),
            providesTags: ["Clothing"]
        }),
        //<---------------------------GUEST--------------------------->
        //GET ALL EQUIPMENT
        getAllEquipment: builder.query({
            query: () => ({
                url: "/auth/equipment",
                method: "GET",
            }),
            providesTags: ["Equipment"]
        }),
        //GET ALL CAMPGROUNDS
        getAllCampgrounds: builder.query({
            query: () => ({
                url: "/auth/campground",
                method: "GET",
            }),
            providesTags: ["Campgrounds"]
        }),
        //GET SINGLE CAMPGROUND
        getSingleCampground: builder.query({
            query: (id) => ({
                url: `/auth/campground/${id}`,
                method: "GET",
            }),
            providesTags: ["Campgrounds", "Activities"]
        }),
        //<---------------------------GET BY TRIP--------------------------->
        //GET BUDGETS BY TRIP
        getTripBudgets: builder.query({
            query: (trip) => ({
                url: `/api/budget/${trip}`,
                method: "GET",
            }),
            providesTags: ["Budgets"]
        }),
        //GET MEALS BY TRIP
        getTripMeals: builder.query({
            query: (trip) => ({
                url: `/api/food/meal/trip/${trip}`,
                method: "GET",
            }),
            providesTags: ["Meals"]
        }),
        //<---------------------------GET ALL--------------------------->
        //GET ALL TRIPS
        getAllTrips: builder.query({
            query: () => ({
                url: "/api/trip",
                method: "GET",
            }),
            providesTags: ["Trips"]
        }),
        //GET ALL BUDGETS
        getAllBudgets: builder.query({
            query: () => ({
                url: "/api/budget",
                method: "GET",
            }),
            providesTags: ["Budgets"]
        }),
        //GET ALL MEALS
        getAllMeals: builder.query({
            query: () => ({
                url: "/api/food/meal",
                method: "GET",
            }),
            providesTags: ["Meals"]
        }),
        //GET ALL ACTIVITIES
        getAllActivities: builder.query({
            query: () => ({
                url: "/api/activity",
                method: "GET",
            }),
            providesTags: ["Activities"]
        }),
        //GET ACTIVITIES BY CAMPGROUND
        getCampgroundActivities: builder.query({
            query: (campground) => ({
                url: `/api/activity/${campground}`,
                method: "GET",
            }),
            providesTags: ["Activities"]
        }),
        //<---------------------------GET SINGLE--------------------------->
        //GET SINGLE TRIP
        getSingleTrip: builder.query({
            query: (id) => ({
                url: `/api/trip/${id}`,
                method: "GET",
            }),
            providesTags: ["Trips", "Meals"]
        }),
        //GET SINGLE MEAL
        getSingleMeal: builder.query({
            query: (id) => ({
                url: `/api/food/meal/${id}`,
                method: "GET",
            }),
            providesTags: ["Meals", "Food", "Users"]
        }),
        //<---------------------------POST--------------------------->
        //POST TRIP
        postTrip: builder.mutation({
            query: (trip) => ({
                url: "/api/trip",
                method: "POST",
                body: trip,
            }),
            invalidatesTags: ["Trips", "Campgrounds"]
        }),
        //POST BUDGET
        postBudget: builder.mutation({
            query: (budget) => ({
                url: "/api/budget",
                method: "POST",
                body: budget,
            }),
            invalidatesTags: ["Budgets", "Trips"]
        }),
        //POST MEAL
        postMeal: builder.mutation({
            query: (meal) => ({
                url: "/api/food/meal",
                method: "POST",
                body: meal,
            }),
            invalidatesTags: ["Meals"]
        }),
        //POST FOOD
        postFood: builder.mutation({
            query: (food) => ({
                url: "/api/food/food",
                method: "POST",
                body: food,
            }),
            invalidatesTags: ["Food", "Users"]
        }),
        //POST CLOTHING
        postClothing: builder.mutation({
            query: (clothing) => ({
                url: "/api/clothing",
                method: "POST",
                body: clothing,
            }),
            invalidatesTags: ["Clothing", "Users"]
        }),
        //POST ACTIVITY
        postActivity: builder.mutation({
            query: (activity) => ({
                url: "/api/activity",
                method: "POST",
                body: activity,
            }),
            invalidatesTags: ["Activities"]
        }),
        //<---------------------------PATCH--------------------------->
        //PATCH USER
        patchUser: builder.mutation({
            query: ({username, password}) => ({
                url: "/auth/account/edit",
                method: "PATCH",
                body: {username, password},
            }),
            invalidatesTags: ["Me"]
        }),
        //PATCH TRIP
        patchTrip: builder.mutation({
            query: ({id, startDate, endDate, gasTotal, gasSingle, fireNight, parking}) => ({
                url: `/api/trip/${id}/edit`,
                method: "PATCH",
                body: {startDate, endDate, gasTotal, gasSingle, fireNight, parking},
            }),
            invalidatesTags: ["Trips", "Campgrounds"]
        }),
        //PATCH ADD MEAL TO TRIP
        patchTripMealAdd: builder.mutation({
            query: ({id, meal}) => ({
                url: `api/trip/${id}/${meal}/add`,
                method: "PATCH",
            }),
            invalidatesTags: ["Trips", "Meals"]
        }),
        //PATCH REMOVE MEAL FROM TRIP
        patchTripMealRemove: builder.mutation({
            query: ({id, meal}) => ({
                url: `api/trip/${id}/${meal}/remove`,
                method: "PATCH",
            }),
            invalidatesTags: ["Trips", "Meals"]
        }),
        //PATCH BUDGET
        patchBudget: builder.mutation({
            query: ({id, total, individual}) => ({
                url: `/api/budget/${id}/edit`,
                method: "PATCH",
                body: {total, individual},
            }),
            invalidatesTags: ["Budgets"]
        }),
        //PATCH MEAL
        patchMeal: builder.mutation({
            query: ({id, day, course, name}) => ({
                url: `/api/food/meal/${id}/edit`,
                method: "PATCH",
                body: {day, course, name},
            }),
            invalidatesTags: ["Meals"]
        }),
        //PATCH REMOVE FOOD FROM MEAL
        patchMealFoodRemove: builder.mutation({
            query: ({id, food}) => ({
                url: `api/food/meal/${id}/${food}/remove`,
                method: "PATCH",
            }),
            invalidatesTags: ["Meals", "Food"]
        }),
        //PATCH FOOD
        patchFood: builder.mutation({
            query: ({id, name}) => ({
                url: `/api/food/food/${id}/edit`,
                method: "PATCH",
                body: {name},
            }),
            invalidatesTags: ["Food"]
        }),
        //PATCH CLOTHING
        patchClothing: builder.mutation({
            query: ({id, name}) => ({
                url: `/api/clothing/${id}/edit`,
                method: "PATCH",
                body: {name},
            }),
            invalidatesTags: ["Clothing"]
        }),
        //PATCH ACTIVITY
        patchActivity: builder.mutation({
            query: ({id, name}) => ({
                url: `/api/activity/${id}/edit`,
                method: "PATCH",
                body: {name},
            }),
            invalidatesTags: ["Activities"]
        }),
        //<---------------------------TOGGLES--------------------------->
        //TRIP CURRENT TOGGLE
        patchTripCurrentToggle: builder.mutation({
            query: ({id, current}) => ({
                url: `/api/trip/${id}/current`,
                method: "PATCH",
                body: {current},
            }),
            invalidatesTags: ["Trips"]
        }),
        //FOOD COOLER TOGGLE
        patchFoodCoolerToggle: builder.mutation({
            query: ({id, cooler}) => ({
                url: `/api/food/food/${id}/cooler`,
                method: "PATCH",
                body: {cooler},
            }),
            invalidatesTags: ["Food"]
        }),
        //FOOD PURCHASE TOGGLE
        patchFoodPurchaseToggle: builder.mutation({
            query: ({id, purchased}) => ({
                url: `/api/food/food/${id}/purchased`,
                method: "PATCH",
                body: {purchased},
            }),
            invalidatesTags: ["Food"]
        }),
        //CLOTHING PACK TOGGLE
        patchClothingPackToggle: builder.mutation({
            query: ({id, packed}) => ({
                url: `/api/clothing/${id}/packed`,
                method: "PATCH",
                body: {packed},
            }),
            invalidatesTags: ["Clothing"]
        }),
        //EQUIPMENT PACK TOGGLE
        patchEquipmentPackToggle: builder.mutation({
            query: ({id, packed}) => ({
                url: `/auth/equipment/${id}/pack`,
                method: "PATCH",
                body: {packed},
            }),
            invalidatesTags: ["Equipment"]
        }),
        //EQUIPMENT NEED TOGGLE
        patchEquipmentNeedToggle: builder.mutation({
            query: ({id, needed}) => ({
                url: `/auth/equipment/${id}/need`,
                method: "PATCH",
                body: {needed},
            }),
            invalidatesTags: ["Equipment"]
        }),
        //<---------------------------DELETE--------------------------->
        //DELETE BUDGET
        deleteBudget: builder.mutation({
            query: (id, budget) => ({
                url: `/api/budget/${id}`,
                method: "DELETE",
                body: budget
            }),
            invalidatesTags: ["Budgets"]
        }),
        //DELETE MEAL
        deleteMeal: builder.mutation({
            query: (id, meal) => ({
                url: `/api/food/meal/${id}`,
                method: "DELETE",
                body: meal
            }),
            invalidatesTags: ["Meals"]
        }),
        //DELETE FOOD
        deleteFood: builder.mutation({
            query: (id, food) => ({
                url: `/api/food/food/${id}`,
                method: "DELETE",
                body: food
            }),
            invalidatesTags: ["Food"]
        }),
        //DELETE CLOTHING
        deleteClothing: builder.mutation({
            query: (id, clothing) => ({
                url: `/api/clothing/${id}`,
                method: "DELETE",
                body: clothing
            }),
            invalidatesTags: ["Clothing"]
        }),
        //DELETE ACTIVITY
        deleteActivity: builder.mutation({
            query: (id, activity) => ({
                url: `/api/activity/${id}`,
                method: "DELETE",
                body: activity
            }),
            invalidatesTags: ["Activities"]
        }),
        //<---------------------------ADMIN--------------------------->
        //POST CAMPGROUND
        postCampground: builder.mutation({
            query: (campground) => ({
                url: "/auth/campground",
                method: "POST",
                body: campground,
            }),
            invalidatesTags: ["Campgrounds"]
        }),
        //POST EQUIPMENT
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: "/auth/equipment",
                method: "POST",
                body: equipment,
            }),
            invalidatesTags: ["Equipment"]
        }),
        //PATCH CAMPGROUND
        patchCampground: builder.mutation({
            query: ({id, park, price, firewood, distance, curvy, reserveFrame, website, generalArea, picture}) => ({
                url: `/auth/campground/${id}/edit`,
                method: "PATCH",
                body: {park, price, firewood, distance, curvy, reserveFrame, website, generalArea, picture},
            }),
            invalidatesTags: ["Campgrounds"]
        }),
        //PATCH ADD ACTITITY TO CAMPGROUND
        patchCampgroundActivityAdd: builder.mutation({
            query: ({id, activity}) => ({
                url: `/acuth/campground/${id}/${activity}/add`,
                method: "PATCH",
            }),
            invalidatesTags: ["Campgrounds", "Activities"]
        }),
        //PATCH REMOVE ACTIVITY FROM CAMPGROUND
        patchCampgroundActivityRemove: builder.mutation({
            query: ({id, activity}) => ({
                url: `/acuth/campground/${id}/${activity}/remove`,
                method: "PATCH",
            }),
            invalidatesTags: ["Campgrounds", "Activities"]
        }),
        //PATCH EQUIPMENT
        patchEquipment: builder.mutation({
            query: ({id, name}) => ({
                url: `/auth/equipment/${id}/edit`,
                method: "PATCH",
                body: {name} 
            }),
            invalidatesTags: ["Equipment"]
        }),
        //DELETE TRIP
        deleteTrip: builder.mutation({
            query: (id, trip) => ({
                url: `/auth/trip/${id}`,
                method: "DELETE",
                body: trip
            }),
            invalidatesTags: ["Trips"]
        }),
        //DELETE CAMPGROUND
        deleteCampground: builder.mutation({
            query: (id, campground) => ({
                url: `/auth/campground/${id}`,
                method: "DELETE",
                body: campground
            }),
            invalidatesTags: ["Campgrounds"]
        }),
        //DELETE EQUIPMENT
        deleteEquipment: builder.mutation({
            query: (id, equipment) => ({
                url: `/auth/equipment/${id}`,
                method: "DELETE",
                body: equipment
            }),
            invalidatesTags: ["Equipment"]
        }),
    }),
})

export default api;

export const {
    //AUTHORIZATION
    useLoginMutation,
    useLogoutMutation,
    useGetAllUsersValidationQuery,
    //GET USER INFO
    useGetUserQuery,
    useGetUserFoodQuery,
    useGetUserClothingQuery,
    //GUEST
    useGetAllEquipmentQuery,
    useGetAllCampgroundsQuery,
    useGetSingleCampgroundQuery,
    //GET BY TRIP
    useGetTripBudgetsQuery,
    useGetTripMealsQuery,
    //GET ALL
    useGetAllTripsQuery,
    useGetAllBudgetsQuery,
    useGetAllMealsQuery,
    useGetAllActivitiesQuery,
    useGetCampgroundActivitiesQuery,
    //GET SINGLE
    useGetSingleTripQuery,
    useGetSingleMealQuery,
    //POST
    usePostTripMutation,
    usePostBudgetMutation,
    usePostMealMutation,
    usePostFoodMutation,
    usePostClothingMutation,
    usePostActivityMutation,
    //PATCH
    usePatchUserMutation,
    usePatchTripMutation,
    usePatchTripMealAddMutation,
    usePatchTripMealRemoveMutation,
    usePatchBudgetMutation,
    usePatchMealMutation,
    usePatchMealFoodRemoveMutation,
    usePatchFoodMutation,
    usePatchClothingMutation,
    usePatchActivityMutation,
    //TOGGLES
    usePatchTripCurrentToggleMutation,
    usePatchFoodCoolerToggleMutation,
    usePatchFoodPurchaseToggleMutation,
    usePatchClothingPackToggleMutation,
    usePatchEquipmentPackToggleMutation,
    usePatchEquipmentNeedToggleMutation,
    //DELETE
    useDeleteBudgetMutation,
    useDeleteMealMutation,
    useDeleteFoodMutation,
    useDeleteClothingMutation,
    useDeleteActivityMutation,
    //ADMIN
    usePostCampgroundMutation,
    usePostEquipmentMutation,
    usePatchCampgroundMutation,
    usePatchCampgroundActivityAddMutation,
    usePatchCampgroundActivityRemoveMutation,
    usePatchEquipmentMutation,
    useDeleteTripMutation,
    useDeleteCampgroundMutation,
    useDeleteEquipmentMutation
} = api