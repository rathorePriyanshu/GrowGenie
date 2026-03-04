import { FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useRoadmapStore } from "../store/roadmap";
import { useNavigate, useParams } from "react-router-dom";
import { saveRoadmap } from "../servies/api";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roadmap, LoadProfileRoadmap, loading } = useRoadmapStore();

  useEffect(() => {
    try {
      if (!id) return;

      if (!roadmap || roadmap._id !== id) {
        LoadProfileRoadmap(id);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  if (loading) return <Loading />;

  const handleClick = async () => {
    try {
      await saveRoadmap(id!);
      toast.success("Roadmap saved succesfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden bg-[#0d1117] group/design-root">
      <div className="flex flex-col h-full grow">
        <div className="flex gap-2 justify-start px-5 py-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 flex rounded-lg bg-buttonSecondary hover:scale-110"
          >
            <span className="text-center text-buttonPrimary">
              <FaArrowCircleLeft size={20} />
            </span>
          </button>
        </div>
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 py-5 flex flex-1 justify-center">
          <div className="flex flex-col flex-1 max-w-[960px]">
            <div className="flex flex-wrap gap-3 p-4">
              <div className="flex flex-col gap-3 min-w-72">
                <p className="tracking-tighter text-white font-black text-4xl lg:text-5xl">
                  {roadmap?.career_name}
                </p>
                <p className="font-normal text-white/40 leading-normal text-base">
                  your step by step from your high school to your career
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
                <h2 className="font-bold tracking-tight text-white mb-3 text-2xl">
                  Overview
                </h2>
                <p className="font-normal leading-normal text-white/40 text-base mb-6">
                  {roadmap?.roadmap_json.overview.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex gap-2 items-center bg-[#0d1117] border border-[#30363d] rounded-full px-4 py-2">
                    <span className="text-buttonPrimary text-lg">
                      <MdOutlineSignalCellularAlt />
                    </span>
                    <span className="text-sm text-white/40">
                      Difficulty:
                      <span className="font-bold ml-1 text-white">
                        {roadmap?.roadmap_json.overview.difficulty}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center bg-[#0d1117] border border-[#30363d] rounded-full px-4 py-2">
                    <span className="text-buttonPrimary text-md">
                      <FaHourglassHalf />
                    </span>
                    <span className="text-sm text-white/40">
                      Time:
                      <span className="font-bold ml-1 text-white">
                        {roadmap?.roadmap_json.overview.time_required}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center bg-[#0d1117] border border-[#30363d] rounded-full px-4 py-2">
                    <span className="text-buttonPrimary text-lg">
                      <MdOutlinePayments />
                    </span>
                    <span className="text-sm text-white/40">
                      Salary:
                      <span className="font-bold ml-1 text-white">
                        {roadmap?.roadmap_json.overview.salary_range}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white px-4 pb-3 pt-5">
              Career Timeline
            </h2>
            <div className="relative px-4 py-5">
              <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-[#30363d]"></div>
              <div className="relative flex flex-col items-start gap-6 mb-8 pl-16">
                <div className="w-14"></div>
                {roadmap?.roadmap_json.steps.map((step) => (
                  <div className="flex-1 rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                    <p className="tex-sm text-buttonPrimary leading-normal">
                      STEP {step.step_number}
                    </p>
                    <h3 className="text-lg text-white tracking-tight mt-1 font-bold">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-normal mt-2">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white px-4 pb-3 pt-5">
              Skills to learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
              {roadmap?.roadmap_json.skills.map((skill) => (
                <div className="rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                  <div className="flex gap-3 items-center mb-4">
                    <h3 className="font-bold text-lg text-white">
                      {skill.category}
                    </h3>
                  </div>
                  <ul className="text-white/40 list-disc list-inside space-y-2 text-sm">
                    {skill.items.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white  px-4 pb-3 pt-5">
              Projects to Build
            </h2>
            <div className="flex flex-col gap-4 p-4">
              {roadmap?.roadmap_json.projects.map((project) => (
                <div className="rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                  <h3 className="font-bold text-white">
                    {project.level}: <span>{project.title}</span>
                  </h3>
                  <p className="text-sm text-white/40 mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white  px-4 pb-3 pt-5">
              Exams & Colleges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
              <div className="rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                <div className="flex gap-3 items-center mb-4">
                  <h3 className="font-bold text-lg text-white">
                    Top Enterance Exam
                  </h3>
                </div>
                <ul className="text-white/40 list-disc list-inside space-y-2 text-sm">
                  {roadmap?.roadmap_json.exams.map((exam) => (
                    <li>{exam}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                <div className="flex gap-3 items-center mb-4">
                  <h3 className="font-bold text-lg text-white">Top Colleges</h3>
                </div>
                <ul className="text-white/40 list-disc list-inside space-y-2 text-sm">
                  {roadmap?.roadmap_json.colleges.map((college) => (
                    <li>{college}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white  px-4 pb-3 pt-5">
              Salary & Growth
            </h2>
            <div className="px-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center">
                {roadmap?.roadmap_json.salary_growth.map(
                  (growth, index, arr) => (
                    <>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{growth.role}</h3>
                        <p className="text-sm text-white/40">
                          ₹{growth.salary_range} - {growth.experience}{" "}
                          experience
                        </p>
                      </div>
                      {index < arr.length - 1 && (
                        <>
                          <span className="text-2xl text-buttonPrimary hidden md:block">
                            <IoMdArrowRoundForward />
                          </span>
                          <span className="text-2xl text-buttonPrimary md:hidden rotate-90 mx-auto">
                            <IoMdArrowRoundForward />
                          </span>
                        </>
                      )}
                    </>
                  ),
                )}
              </div>
            </div>

            <h2 className="font-bold tracking-tight text-2xl text-white  px-4 pb-3 pt-5">
              Future Scope
            </h2>
            <div className="p-4">
              <div className="rounded-lg p-5 border border-[#30363d] bg-[#161b22]">
                <p className="text-white/40 text-base font-normal leading-relaxed">
                  {roadmap?.roadmap_json.future_scope}
                </p>
              </div>
            </div>
            <div className="p-4 mt-6">
              <button
                data-tour="roadmap-section"
                onClick={handleClick}
                className="w-full bg-buttonPrimary text-white font-bold py-4 px-6 rounded-lg text-lg text-center shadow-glow hover:bg-green-500 transition-all"
              >
                Save Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
