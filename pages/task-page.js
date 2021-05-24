import { useEffect } from "react";
import Link from "next/link";
// Client side fetchingを実行する為
import useSWR from "swr";

import Layout from "../components/Layout";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

// -- エンドポイントのurlを引数に受け取りfetchをし、最終的にjsonのフォーマットに変換する関数 -- //
const fetcher = (url) => fetch(url).then((res) => res.json());

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = ({ staticfilteredTasks }) => {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticfilteredTasks,
  });

  // -- tasksのデータを作成順にsortingする定数 -- //
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // -- mutateを実行することでuseSWRで取得したデータのキャッシュを最新にできる。 -- //
  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="task-page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href="/main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;

export async function getStaticProps() {
  const staticfilteredTasks = await getAllTasksData();

  return {
    props: { staticfilteredTasks },
    revalidate: 3,
  };
}
